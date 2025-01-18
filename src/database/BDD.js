class BDD {
  static async save(newData) {
    var file = new Blob(['data = ' + JSON.stringify(newData, null, '  ')]);
    const fileHandle = await self.showSaveFilePicker({
      suggestedName: 'bdd-DashboardEntreprise.js',
      types: [{ description: "bdd Dashboard Entreprise", type: "js", },],
    });
    const writeFile = async (fileHandle, contents) => {
      const writable = await fileHandle.createWritable();
      await writable.write(contents);
      await writable.close();
    };
    await writeFile(fileHandle, file).then(() => window.location.reload());
    return doc;
  }
}