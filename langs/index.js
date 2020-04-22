// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
import  I18n from 'react-native-i18n'
I18n.fallbacks = true

import en from './en'
import zhcn  from  './zh-cn'

import ar from './ar'
import bg from './bg'
import ca from './ca'
import cs from './cs'
import da from './da'
import de from './de'
import el from './el'
import eo from './eo'
import es from './es'
import fi from './fi'
import fr from './fr'
import ga from './ga'
import id from './id'
import it from './it'
import kk from './kk'
import la from './la'
import nl from './nl'
import pl from './pl'
import pt from './pt'
import ro from './ro'
import ru from './ru'
import sk from './sk'
import th from './th'
import tl from './tl'
import tr from './tr'

I18n.translations = {
    'en': en,
    'zh': zhcn,
    'ar':ar,
    'bg':bg,
    'ca':ca,
    'cs':cs,
    'da':da,
    'de':de,
    'el':el,
    'eo':eo,
    'es':es,
    'fi':fi,
    'fr':fr,
    'ga':ga,
    'id':id,
    'it':it,
    'kk':kk,
    'la':la,
    'nl':nl,
    'pl':pl,
    'pt':pt,
    'ro':ro,
    'ru':ru,
    'sk':sk,
    'th':th,
    'tl':tl,
    'tr':tr
}

module.exports = function (key) {
    return I18n.t(key)
}