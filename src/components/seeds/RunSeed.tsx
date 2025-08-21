const runSeed = async (db: any, seedSql: string, chunkSize = 200) => {
  const statements = seedSql
    .split(/;\s*$/m)
    .map(s => s.trim())
    .filter(Boolean);

  let index = 0;

  const execChunk = () => {
    const chunk = statements.slice(index, index + chunkSize);
    db.run("BEGIN TRANSACTION");
    for (const stmt of chunk) {
      try {
        db.run(stmt);
      } catch (err) {
        console.warn("Skipping statement:", stmt.slice(0, 100), err);
      }
    }
    db.run("COMMIT");

    index += chunkSize;

    if (index < statements.length) {
      // soltamos el event loop y seguimos en el próximo frame
      setTimeout(execChunk, 0);
    } else {
      console.log("✅ Seed completado");
    }
  };

  execChunk();
};

export default runSeed;