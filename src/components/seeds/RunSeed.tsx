const runSeed = (db: any, seedSql: string) => {
  const statements = seedSql
    .split(/;\s*$/m) // split on semicolons at line end
    .map(s => s.trim())
    .filter(Boolean);

  db.run("BEGIN TRANSACTION");
  for (const stmt of statements) {
    try {
      db.run(stmt);
    } catch (err) {
      console.warn("Skipping statement:", stmt, err);
    }
  }
  db.run("COMMIT");
};

export default runSeed;