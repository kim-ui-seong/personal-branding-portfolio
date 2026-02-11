import L_J from './assets/L_J.png';
import L_Y from './assets/L_Y.png';
import L_N from './assets/L_N.png';
import L_U from './assets/L_U.png';
import L_O from './assets/L_O.png';
import L_G from './assets/L_G.png';

export function getLogoImage(logoId) {
    switch(logoId) {
        case 1 : return L_J;
        case 2 : return L_Y;
        case 3 : return L_O;
        case 4 : return L_U;
        case 5 : return L_N;
        case 6 :  return L_G;
    }
}