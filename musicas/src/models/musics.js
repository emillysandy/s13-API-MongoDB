const mongoose = require("mongoose")


const musicsSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String },
    duration: { type: String },
    launchYear: { type: String },
    favorited: { type: String },
    artists: { type: String }
}, {
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

musicsSchema.virtual('music').
    get(function () {
    return this.id + '-' + this.title.artists;
    }).
    set(function (v) {
    this.id = v.substr(0, v.indexOf('-'));
    this.title.artists = v.substr(v.indexOf('-') + 1);
    });

// atribuindo o esquema a uma collection
// estou definindo o nome da collection que irei salvar no banco
const musics = mongoose.model('musics', musicsSchema);

// exportar o model para ser utilizado
module.exports = musics;