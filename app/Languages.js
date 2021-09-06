
import LocalizedStrings from 'react-native-localization';

var lang = {};


lang.strings = new LocalizedStrings({
    "en-US":{
        how:"How do you want your egg today?",
        boiledEgg:"Boiled egg",
        softBoiledEgg:"Soft-boiled egg",
        choice:"How to choose the egg"
    },
    en:{
        how:"How do you want your egg today?",
        boiledEgg:"Boiled egg",
        softBoiledEgg:"Soft-boiled egg",
        choice:"How to choose the egg"
    },
    ro: {
        how:"Come vuoi il tuo uovo oggi?",
        boiledEgg:"Uovo sodo",
        softBoiledEgg:"Uovo alla coque",
        choice:"Come scegliere l'uovo"
    }
});
lang.activeLanguages = [];
lang.defaultLanguage = '';
lang.getnew = () => {
    return new Promise((resolve, reject) => {
        fetch('https://client.picoly.app/api/getLang', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            lang.strings = new LocalizedStrings(responseJson.strings);
            lang.activeLanguages = responseJson.langs;
            lang.activeLanguages.map(item=>{
                if(item.default){
                    lang.defaultLanguage = item.abbr;
                }
            })
            resolve();
        });
    });
};

lang.translateModel = (item, fields) => {
    if (!fields) fields = [];
    let activeLang = lang.strings.getLanguage();
    fields.map(field => {
        if (!item.hasOwnProperty(field+'_trans')) item[field+'_trans'] = item[field];
        let fieldTranslations = item[field+'_trans'];
        if (fieldTranslations.hasOwnProperty(activeLang) && fieldTranslations[activeLang]) {
            item[field]  = fieldTranslations[activeLang];
        } else if (fieldTranslations.hasOwnProperty(lang.defaultLanguage) && fieldTranslations[lang.defaultLanguage]) {
            item[field]  = fieldTranslations[lang.defaultLanguage];
        } else if (fieldTranslations.hasOwnProperty('en') && fieldTranslations['en']) {
            item[field]  = fieldTranslations['en'];
        } else if (fieldTranslations) {
            item[field]  = '';
        } else {
            item[field] = '';
        }
    });
    return item;
}


export default lang;
