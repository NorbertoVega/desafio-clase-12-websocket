const fs = require('fs');

class Contenedor {

    constructor(ruta, nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.ruta = ruta + nombreArchivo;
    }

    async save(object) {
        try {
            const stringFileContent = await fs.promises.readFile(this.ruta, 'utf-8');
            let contentToSave;
            let id;

            if (stringFileContent === '') {
                contentToSave = [{ ...object, id: 1 }];
                id = 1;
            }
            else {
                let fileContent = JSON.parse(stringFileContent);
                id = fileContent[fileContent.length - 1].id + 1;
                contentToSave = fileContent;
                contentToSave.push({ ...object, id: id });
            }
            await fs.promises.writeFile(this.ruta, JSON.stringify(contentToSave, null, 2));
            return id;

        } catch (e) {
            throw new Error(`Hubo un problema en save(): ${e.message}`)
        }
    }

    async getById(id) {
        try {
            const stringFileContent = await fs.promises.readFile(this.ruta, 'utf-8');
            if (stringFileContent === '') {
                console.log('\ngetById: El archivo está vacío.');
                return null;
            }
            else {
                let fileContent = JSON.parse(stringFileContent);
                const result = fileContent.filter(elem => elem.id === id);
                if (result.length === 0) {
                    console.log(`\ngetById: No se encontró el elemento. El id ${id} no existe.`);
                    return null;
                } else {
                    return result[0];
                }
            }

        } catch (e) {
            throw new Error(`Hubo un problema en getById(): ${e.message}`)
        }
    }

    async getAll() {
        try {
            const fileContent = await fs.promises.readFile(this.ruta, 'utf-8');
            if (fileContent === '') {
                return [];
            }
            return JSON.parse(fileContent);;
        } catch (e) {
            throw new Error(`Hubo un problema en getAll(): ${e.message}`)
        }
    }

    async deleteById(id) {
        const element = await this.getById(id);
        if (element === null) {
            console.log(`\ndeleteById: No se encontró el elemento a eliminar. El id ${id} no existe.`);
        } else {
            const allElements = await this.getAll();

            if (allElements.length === 1)
                await this.deleteAll();
            else {
                const contentToSave = allElements.filter(elem => elem.id !== id);
                await fs.promises.writeFile(this.ruta, JSON.stringify(contentToSave, null, 2));
            }
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.ruta, '');

        } catch (e) {
            throw new Error(`Hubo un problema en deleteAll(): ${e.message}`)
        }
    }
}

module.exports = Contenedor;

