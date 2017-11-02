import {AfoListObservable, AngularFireOfflineDatabase} from "angularfire2-offline";
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';

import {AuthenicateServiceProvider} from "../../providers/authenicate-service/authenicate-service";
import {Component} from '@angular/core';

import {LoginPage} from "../login/login";
import {NativeStorage} from "@ionic-native/native-storage";
import {OrderConfirmationPage} from "../order-confirmation/order-confirmation";
import {OrderconfirmationserviceProvider} from "../../providers/orderconfirmationservice/orderconfirmationservice";
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {UserInformation} from "../../model/userInformation";


/**
 * Generated class for the OrderDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component( {
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
} )
export class OrderDetailPage {
  countryList: any[] = [];
  statesList: any[] = [];
  qty: number = 1;
  grandTotalPrice: number = 0;
  shippingPrice: number = 0;
  countryListNew: AfoListObservable<any[]>;
  orderInfoList: AfoListObservable<any[]>;
  cityList: AfoListObservable<any[]>;
  citiesList: any[] = [
    {
      "name": "Andaman and Nicobar Islands",
      "cities": [
        {
          "city": "Port Blair*"
        },
      ]
    },
    {
      "name": "Andhra Pradesh",
      "cities": [
        {
          "city": "Adoni"
        },
        {
          "city": "Amalapuram"
        },
        {
          "city": "Anakapalle"
        },
        {
          "city": "Anantapur"
        },
        {
          "city": "Bapatla"
        },
        {
          "city": "Bheemunipatnam"
        },
        {
          "city": "Bhimavaram"
        },
        {
          "city": "Bobbili"
        },
        {
          "city": "Chilakaluripet"
        },
        {
          "city": "Chirala"
        },
        {
          "city": "Chittoor"
        },
        {
          "city": "Dharmavaram"
        },
        {
          "city": "Eluru"
        },
        {
          "city": "Gooty"
        },
        {
          "city": "Gudivada"
        },
        {
          "city": "Gudur"
        },
        {
          "city": "Guntakal"
        },
        {
          "city": "Guntur"
        },
        {
          "city": "Hindupur"
        },
        {
          "city": "Jaggaiahpet"
        },
        {
          "city": "Jammalamadugu"
        },
        {
          "city": "Kadapa"
        },
        {
          "city": "Kadiri"
        },
        {
          "city": "Kakinada"
        },
        {
          "city": "Kandukur"
        },
        {
          "city": "Kavali"
        },
        {
          "city": "Kovvur"
        },
        {
          "city": "Kurnool"
        },
        {
          "city": "Macherla"
        },
        {
          "city": "Machilipatnam"
        },
        {
          "city": "Madanapalle"
        },
        {
          "city": "Mandapeta"
        },
        {
          "city": "Markapur"
        },
        {
          "city": "Nagari"
        },
        {
          "city": "Naidupet"
        },
        {
          "city": "Nandyal"
        },
        {
          "city": "Narasapuram"
        },
        {
          "city": "Narasaraopet"
        },
        {
          "city": "Narsipatnam"
        },
        {
          "city": "Nellore"
        },
        {
          "city": "Nidadavole"
        },
        {
          "city": "Nuzvid"
        },
        {
          "city": "Ongole"
        },
        {
          "city": "Palacole"
        },
        {
          "city": "Palasa Kasibugga"
        },
        {
          "city": "Parvathipuram"
        },
        {
          "city": "Pedana"
        },
        {
          "city": "Peddapuram"
        },
        {
          "city": "Pithapuram"
        },
        {
          "city": "Ponnur"
        },
        {
          "city": "Proddatur"
        },
        {
          "city": "Punganur"
        },
        {
          "city": "Puttur"
        },
        {
          "city": "Rajahmundry"
        },
        {
          "city": "Rajam"
        },
        {
          "city": "Rajampet"
        },
        {
          "city": "Ramachandrapuram"
        },
        {
          "city": "Rayachoti"
        },
        {
          "city": "Rayadurg"
        },
        {
          "city": "Renigunta"
        },
        {
          "city": "Repalle"
        },
        {
          "city": "Salur"
        },
        {
          "city": "Samalkot"
        },
        {
          "city": "Sattenapalle"
        },
        {
          "city": "Srikakulam"
        },
        {
          "city": "Srikalahasti"
        },
        {
          "city": "Srisailam Project (Right Flank Colony) Township"
        },
        {
          "city": "Sullurpeta"
        },
        {
          "city": "Tadepalligudem"
        },
        {
          "city": "Tadpatri"
        },
        {
          "city": "Tanuku"
        },
        {
          "city": "Tenali"
        },
        {
          "city": "Tirupati"
        },
        {
          "city": "Tiruvuru"
        },
        {
          "city": "Tuni"
        },
        {
          "city": "Uravakonda"
        },
        {
          "city": "Venkatagiri"
        },
        {
          "city": "Vijayawada"
        },
        {
          "city": "Vinukonda"
        },
        {
          "city": "Visakhapatnam"
        },
        {
          "city": "Vizianagaram"
        },
        {
          "city": "Yemmiganur"
        },
        {
          "city": "Yerraguntla"
        }
      ]
    },
    {
      "name": "Arunachal Pradesh",
      "cities": [
        {
          "city": "Naharlagun"
        },
        {
          "city": "Pasighat"
        }
      ]
    },
    {
      "name": "Assam",
      "cities": [
        {
          "city": "Barpeta"
        },
        {
          "city": "Bongaigaon City"
        },
        {
          "city": "Dhubri"
        },
        {
          "city": "Dibrugarh"
        },
        {
          "city": "Diphu"
        },
        {
          "city": "Goalpara"
        },
        {
          "city": "Guwahati"
        },
        {
          "city": "Jorhat"
        },
        {
          "city": "Karimganj"
        },
        {
          "city": "Lanka"
        },
        {
          "city": "Lumding"
        },
        {
          "city": "Mangaldoi"
        },
        {
          "city": "Mankachar"
        },
        {
          "city": "Margherita"
        },
        {
          "city": "Mariani"
        },
        {
          "city": "Marigaon"
        },
        {
          "city": "Nagaon"
        },
        {
          "city": "Nalbari"
        },
        {
          "city": "North Lakhimpur"
        },
        {
          "city": "Rangia"
        },
        {
          "city": "Sibsagar"
        },
        {
          "city": "Silapathar"
        },
        {
          "city": "Silchar"
        },
        {
          "city": "Tezpur"
        },
        {
          "city": "Tinsukia"
        }
      ]
    },
    {
      "name": "Bihar",
      "cities": [
        {
          "city": "Araria"
        },
        {
          "city": "Arrah"
        },
        {
          "city": "Arwal"
        },
        {
          "city": "Asarganj"
        },
        {
          "city": "Aurangabad"
        },
        {
          "city": "Bagaha"
        },
        {
          "city": "Barh"
        },
        {
          "city": "Begusarai"
        },
        {
          "city": "Bettiah"
        },
        {
          "city": "Bhabua"
        },
        {
          "city": "Bhagalpur"
        },
        {
          "city": "Buxar"
        },
        {
          "city": "Chhapra"
        },
        {
          "city": "Darbhanga"
        },
        {
          "city": "Dehri-on-Sone"
        },
        {
          "city": "Dumraon"
        },
        {
          "city": "Forbesganj"
        },
        {
          "city": "Gaya"
        },
        {
          "city": "Gopalganj"
        },
        {
          "city": "Hajipur"
        },
        {
          "city": "Jamalpur"
        },
        {
          "city": "Jamui"
        },
        {
          "city": "Jehanabad"
        },
        {
          "city": "Katihar"
        },
        {
          "city": "Kishanganj"
        },
        {
          "city": "Lakhisarai"
        },
        {
          "city": "Lalganj"
        },
        {
          "city": "Madhepura"
        },
        {
          "city": "Madhubani"
        },
        {
          "city": "Maharajganj"
        },
        {
          "city": "Mahnar Bazar"
        },
        {
          "city": "Makhdumpur"
        },
        {
          "city": "Maner"
        },
        {
          "city": "Manihari"
        },
        {
          "city": "Marhaura"
        },
        {
          "city": "Masaurhi"
        },
        {
          "city": "Mirganj"
        },
        {
          "city": "Mokameh"
        },
        {
          "city": "Motihari"
        },
        {
          "city": "Motipur"
        },
        {
          "city": "Munger"
        },
        {
          "city": "Murliganj"
        },
        {
          "city": "Muzaffarpur"
        },
        {
          "city": "Narkatiaganj"
        },
        {
          "city": "Naugachhia"
        },
        {
          "city": "Nawada"
        },
        {
          "city": "Nokha"
        },
        {
          "city": "Patna*"
        },
        {
          "city": "Piro"
        },
        {
          "city": "Purnia"
        },
        {
          "city": "Rafiganj"
        },
        {
          "city": "Rajgir"
        },
        {
          "city": "Ramnagar"
        },
        {
          "city": "Raxaul Bazar"
        },
        {
          "city": "Revelganj"
        },
        {
          "city": "Rosera"
        },
        {
          "city": "Saharsa"
        },
        {
          "city": "Samastipur"
        },
        {
          "city": "Sasaram"
        },
        {
          "city": "Sheikhpura"
        },
        {
          "city": "Sheohar"
        },
        {
          "city": "Sherghati"
        },
        {
          "city": "Silao"
        },
        {
          "city": "Sitamarhi"
        },
        {
          "city": "Siwan"
        },
        {
          "city": "Sonepur"
        },
        {
          "city": "Sugauli"
        },
        {
          "city": "Sultanganj"
        },
        {
          "city": "Supaul"
        },
        {
          "city": "Warisaliganj"
        }
      ]
    },
    {
      "name": "Chandigarh",
      "cities": [
        {
          "city": "Chandigarh*"
        }
      ]
    },
    {
      "name": "Chhattisgarh",
      "cities": [
        {
          "city": "Ambikapur"
        },
        {
          "city": "Bhatapara"
        },
        {
          "city": "Bhilai Nagar"
        },
        {
          "city": "Bilaspur"
        },
        {
          "city": "Chirmiri"
        },
        {
          "city": "Dalli-Rajhara"
        },
        {
          "city": "Dhamtari"
        },
        {
          "city": "Durg"
        },
        {
          "city": "Jagdalpur"
        },
        {
          "city": "Korba"
        },
        {
          "city": "Mahasamund"
        },
        {
          "city": "Manendragarh"
        },
        {
          "city": "Mungeli"
        },
        {
          "city": "Naila Janjgir"
        },
        {
          "city": "Raigarh"
        },
        {
          "city": "Raipur*"
        },
        {
          "city": "Rajnandgaon"
        },
        {
          "city": "Sakti"
        },
        {
          "city": "Tilda Newra"
        }
      ]
    },
    {
      "name": "Dadra and Nagar Haveli",
      "cities": [
        {
          "city": "Silvassa*"
        }
      ]
    },
    {
      "name": "Delhi",
      "cities": [
        {
          "city": "Delhi"
        },
        {
          "city": "New Delhi*"
        }
      ]
    },
    {
      "name": "Goa",
      "cities": [
        {
          "city": "Mapusa"
        },
        {
          "city": "Margao"
        },
        {
          "city": "Marmagao"
        },
        {
          "city": "Panaji*"
        }
      ]
    },
    {
      "name": "Gujarat",
      "cities": [
        {
          "city": "Adalaj"
        },
        {
          "city": "Ahmedabad"
        },
        {
          "city": "Amreli"
        },
        {
          "city": "Anand"
        },
        {
          "city": "Anjar"
        },
        {
          "city": "Ankleshwar"
        },
        {
          "city": "Bharuch"
        },
        {
          "city": "Bhavnagar"
        },
        {
          "city": "Bhuj"
        },
        {
          "city": "Chhapra"
        },
        {
          "city": "Deesa"
        },
        {
          "city": "Dhoraji"
        },
        {
          "city": "Godhra"
        },
        {
          "city": "Jamnagar"
        },
        {
          "city": "Kadi"
        },
        {
          "city": "Kapadvanj"
        },
        {
          "city": "Keshod"
        },
        {
          "city": "Khambhat"
        },
        {
          "city": "Lathi"
        },
        {
          "city": "Limbdi"
        },
        {
          "city": "Lunawada"
        },
        {
          "city": "Mahesana"
        },
        {
          "city": "Mahuva"
        },
        {
          "city": "Manavadar"
        },
        {
          "city": "Mandvi"
        },
        {
          "city": "Mangrol"
        },
        {
          "city": "Mansa"
        },
        {
          "city": "Mahemdabad"
        },
        {
          "city": "Modasa"
        },
        {
          "city": "Morvi"
        },
        {
          "city": "Nadiad"
        },
        {
          "city": "Navsari"
        },
        {
          "city": "Padra"
        },
        {
          "city": "Palanpur"
        },
        {
          "city": "Palitana"
        },
        {
          "city": "Pardi"
        },
        {
          "city": "Patan"
        },
        {
          "city": "Petlad"
        },
        {
          "city": "Porbandar"
        },
        {
          "city": "Radhanpur"
        },
        {
          "city": "Rajkot"
        },
        {
          "city": "Rajpipla"
        },
        {
          "city": "Rajula"
        },
        {
          "city": "Ranavav"
        },
        {
          "city": "Rapar"
        },
        {
          "city": "Salaya"
        },
        {
          "city": "Sanand"
        },
        {
          "city": "Savarkundla"
        },
        {
          "city": "Sidhpur"
        },
        {
          "city": "Sihor"
        },
        {
          "city": "Songadh"
        },
        {
          "city": "Surat"
        },
        {
          "city": "Talaja"
        },
        {
          "city": "Thangadh"
        },
        {
          "city": "Tharad"
        },
        {
          "city": "Umbergaon"
        },
        {
          "city": "Umreth"
        },
        {
          "city": "Una"
        },
        {
          "city": "Unjha"
        },
        {
          "city": "Upleta"
        },
        {
          "city": "Vadnagar"
        },
        {
          "city": "Vadodara"
        },
        {
          "city": "Valsad"
        },
        {
          "city": "Vapi"
        },
        {
          "city": "Vapi"
        },
        {
          "city": "Veraval"
        },
        {
          "city": "Vijapur"
        },
        {
          "city": "Viramgam"
        },
        {
          "city": "Visnagar"
        },
        {
          "city": "Vyara"
        },
        {
          "city": "Wadhwan"
        },
        {
          "city": "Wankaner"
        }
      ]
    },
    {
      "name": "Haryana",
      "cities": [
        {
          "city": "Bahadurgarh"
        },
        {
          "city": "Bhiwani"
        },
        {
          "city": "Charkhi Dadri"
        },
        {
          "city": "Faridabad"
        },
        {
          "city": "Fatehabad"
        },
        {
          "city": "Gohana"
        },
        {
          "city": "Gurgaon"
        },
        {
          "city": "Hansi"
        },
        {
          "city": "Hisar"
        },
        {
          "city": "Jind"
        },
        {
          "city": "Kaithal"
        },
        {
          "city": "Karnal"
        },
        {
          "city": "Ladwa"
        },
        {
          "city": "Mahendragarh"
        },
        {
          "city": "Mandi Dabwali"
        },
        {
          "city": "Narnaul"
        },
        {
          "city": "Narwana"
        },
        {
          "city": "Palwal"
        },
        {
          "city": "Panchkula"
        },
        {
          "city": "Panipat"
        },
        {
          "city": "Pehowa"
        },
        {
          "city": "Pinjore"
        },
        {
          "city": "Rania"
        },
        {
          "city": "Ratia"
        },
        {
          "city": "Rewari"
        },
        {
          "city": "Rohtak"
        },
        {
          "city": "Safidon"
        },
        {
          "city": "Samalkha"
        },
        {
          "city": "Sarsod"
        },
        {
          "city": "Shahbad"
        },
        {
          "city": "Sirsa"
        },
        {
          "city": "Sohna"
        },
        {
          "city": "Sonipat"
        },
        {
          "city": "Taraori"
        },
        {
          "city": "Thanesar"
        },
        {
          "city": "Tohana"
        },
        {
          "city": "Yamunanagar"
        }
      ]
    },
    {
      "name": "Himachal Pradesh",
      "cities": [
        {
          "city": "Mandi"
        },
        {
          "city": "Nahan"
        },
        {
          "city": "Palampur"
        },
        {
          "city": "Shimla*"
        },
        {
          "city": "Solan"
        },
        {
          "city": "Sundarnagar"
        }
      ]
    },
    {
      "name": "Jammu and Kashmir",
      "cities": [
        {
          "city": "Anantnag"
        },
        {
          "city": "Baramula"
        },
        {
          "city": "Jammu"
        },
        {
          "city": "Kathua"
        },
        {
          "city": "Punch"
        },
        {
          "city": "Rajauri"
        },
        {
          "city": "Sopore"
        },
        {
          "city": "Srinagar*"
        },
        {
          "city": "Udhampur"
        }
      ]
    },
    {
      "name": "Jharkhand",
      "cities": [
        {
          "city": "Adityapur"
        },
        {
          "city": "Bokaro Steel City"
        },
        {
          "city": "Chaibasa"
        },
        {
          "city": "Chatra"
        },
        {
          "city": "Chirkunda"
        },
        {
          "city": "Medininagar (Daltonganj)"
        },
        {
          "city": "Deoghar"
        },
        {
          "city": "Dhanbad"
        },
        {
          "city": "Dumka"
        },
        {
          "city": "Giridih"
        },
        {
          "city": "Gumia"
        },
        {
          "city": "Hazaribag"
        },
        {
          "city": "Jamshedpur"
        },
        {
          "city": "Jhumri Tilaiya"
        },
        {
          "city": "Lohardaga"
        },
        {
          "city": "Madhupur"
        },
        {
          "city": "Mihijam"
        },
        {
          "city": "Musabani"
        },
        {
          "city": "Pakaur"
        },
        {
          "city": "Patratu"
        },
        {
          "city": "Phusro"
        },
        {
          "city": "Ramgarh"
        },
        {
          "city": "Ranchi*"
        },
        {
          "city": "Sahibganj"
        },
        {
          "city": "Saunda"
        },
        {
          "city": "Simdega"
        },
        {
          "city": "Tenu dam-cum-Kathhara"
        }
      ]
    },
    {
      "name": "Karnataka",
      "cities": [
        {
          "city": "Adyar"
        },
        {
          "city": "Afzalpur"
        },
        {
          "city": "Arsikere"
        },
        {
          "city": "Athni"
        },
        {
          "city": "Bengaluru"
        },
        {
          "city": "Belagavi"
        },
        {
          "city": "Ballari"
        },
        {
          "city": "Chikkamagaluru"
        },
        {
          "city": "Davanagere"
        },
        {
          "city": "Gokak"
        },
        {
          "city": "Hubli-Dharwad"
        },
        {
          "city": "Karwar"
        },
        {
          "city": "Kolar"
        },
        {
          "city": "Lakshmeshwar"
        },
        {
          "city": "Lingsugur"
        },
        {
          "city": "Maddur"
        },
        {
          "city": "Madhugiri"
        },
        {
          "city": "Madikeri"
        },
        {
          "city": "Magadi"
        },
        {
          "city": "Mahalingapura"
        },
        {
          "city": "Malavalli"
        },
        {
          "city": "Malur"
        },
        {
          "city": "Mandya"
        },
        {
          "city": "Mangaluru"
        },
        {
          "city": "Manvi"
        },
        {
          "city": "Mudalagi"
        },
        {
          "city": "Mudabidri"
        },
        {
          "city": "Muddebihal"
        },
        {
          "city": "Mudhol"
        },
        {
          "city": "Mulbagal"
        },
        {
          "city": "Mundargi"
        },
        {
          "city": "Nanjangud"
        },
        {
          "city": "Nargund"
        },
        {
          "city": "Navalgund"
        },
        {
          "city": "Nelamangala"
        },
        {
          "city": "Pavagada"
        },
        {
          "city": "Piriyapatna"
        },
        {
          "city": "Puttur"
        },
        {
          "city": "Rabkavi Banhatti"
        },
        {
          "city": "Raayachuru"
        },
        {
          "city": "Ranebennuru"
        },
        {
          "city": "Ramanagaram"
        },
        {
          "city": "Ramdurg"
        },
        {
          "city": "Ranibennur"
        },
        {
          "city": "Robertson Pet"
        },
        {
          "city": "Ron"
        },
        {
          "city": "Sadalagi"
        },
        {
          "city": "Sagara"
        },
        {
          "city": "Sakaleshapura"
        },
        {
          "city": "Sindagi"
        },
        {
          "city": "Sanduru"
        },
        {
          "city": "Sankeshwara"
        },
        {
          "city": "Saundatti-Yellamma"
        },
        {
          "city": "Savanur"
        },
        {
          "city": "Sedam"
        },
        {
          "city": "Shahabad"
        },
        {
          "city": "Shahpur"
        },
        {
          "city": "Shiggaon"
        },
        {
          "city": "Shikaripur"
        },
        {
          "city": "Shivamogga"
        },
        {
          "city": "Surapura"
        },
        {
          "city": "Shrirangapattana"
        },
        {
          "city": "Sidlaghatta"
        },
        {
          "city": "Sindhagi"
        },
        {
          "city": "Sindhnur"
        },
        {
          "city": "Sira"
        },
        {
          "city": "Sirsi"
        },
        {
          "city": "Siruguppa"
        },
        {
          "city": "Srinivaspur"
        },
        {
          "city": "Tarikere"
        },
        {
          "city": "Tekkalakote"
        },
        {
          "city": "Terdal"
        },
        {
          "city": "Talikota"
        },
        {
          "city": "Tiptur"
        },
        {
          "city": "Tumkur"
        },
        {
          "city": "Udupi"
        },
        {
          "city": "Vijayapura"
        },
        {
          "city": "Wadi"
        },
        {
          "city": "Yadgir"
        },
        {
          "city": "Mysore"
        }
      ]
    },
    {
      "name": "Kerala",
      "cities": [
        {
          "city": "Adoor"
        },
        {
          "city": "Alappuzha"
        },
        {
          "city": "Attingal"
        },
        {
          "city": "Chalakudy"
        },
        {
          "city": "Changanassery"
        },
        {
          "city": "Cherthala"
        },
        {
          "city": "Chittur-Thathamangalam"
        },
        {
          "city": "Guruvayoor"
        },
        {
          "city": "Kanhangad"
        },
        {
          "city": "Kannur"
        },
        {
          "city": "Kasaragod"
        },
        {
          "city": "Kayamkulam"
        },
        {
          "city": "Kochi"
        },
        {
          "city": "Kodungallur"
        },
        {
          "city": "Kollam"
        },
        {
          "city": "Kottayam"
        },
        {
          "city": "Kozhikode"
        },
        {
          "city": "Kunnamkulam"
        },
        {
          "city": "Malappuram"
        },
        {
          "city": "Mattannur"
        },
        {
          "city": "Mavelikkara"
        },
        {
          "city": "Mavoor"
        },
        {
          "city": "Muvattupuzha"
        },
        {
          "city": "Nedumangad"
        },
        {
          "city": "Neyyattinkara"
        },
        {
          "city": "Nilambur"
        },
        {
          "city": "Ottappalam"
        },
        {
          "city": "Palai"
        },
        {
          "city": "Palakkad"
        },
        {
          "city": "Panamattom"
        },
        {
          "city": "Panniyannur"
        },
        {
          "city": "Pappinisseri"
        },
        {
          "city": "Paravoor"
        },
        {
          "city": "Pathanamthitta"
        },
        {
          "city": "Peringathur"
        },
        {
          "city": "Perinthalmanna"
        },
        {
          "city": "Perumbavoor"
        },
        {
          "city": "Ponnani"
        },
        {
          "city": "Punalur"
        },
        {
          "city": "Puthuppally"
        },
        {
          "city": "Koyilandy"
        },
        {
          "city": "Shoranur"
        },
        {
          "city": "Taliparamba"
        },
        {
          "city": "Thiruvalla"
        },
        {
          "city": "Thiruvananthapuram"
        },
        {
          "city": "Thodupuzha"
        },
        {
          "city": "Thrissur"
        },
        {
          "city": "Tirur"
        },
        {
          "city": "Vaikom"
        },
        {
          "city": "Varkala"
        },
        {
          "city": "Vatakara"
        }
      ]
    },
    {
      "name": "Madhya Pradesh",
      "cities": [
        {
          "city": "Alirajpur"
        },
        {
          "city": "Ashok Nagar"
        },
        {
          "city": "Balaghat"
        },
        {
          "city": "Bhopal"
        },
        {
          "city": "Ganjbasoda"
        },
        {
          "city": "Gwalior"
        },
        {
          "city": "Indore"
        },
        {
          "city": "Itarsi"
        },
        {
          "city": "Jabalpur"
        },
        {
          "city": "Lahar"
        },
        {
          "city": "Maharajpur"
        },
        {
          "city": "Mahidpur"
        },
        {
          "city": "Maihar"
        },
        {
          "city": "Malaj Khand"
        },
        {
          "city": "Manasa"
        },
        {
          "city": "Manawar"
        },
        {
          "city": "Mandideep"
        },
        {
          "city": "Mandla"
        },
        {
          "city": "Mandsaur"
        },
        {
          "city": "Mauganj"
        },
        {
          "city": "Mhow Cantonment"
        },
        {
          "city": "Mhowgaon"
        },
        {
          "city": "Morena"
        },
        {
          "city": "Multai"
        },
        {
          "city": "Mundi"
        },
        {
          "city": "Murwara (Katni)"
        },
        {
          "city": "Nagda"
        },
        {
          "city": "Nainpur"
        },
        {
          "city": "Narsinghgarh"
        },
        {
          "city": "Narsinghgarh"
        },
        {
          "city": "Neemuch"
        },
        {
          "city": "Nepanagar"
        },
        {
          "city": "Niwari"
        },
        {
          "city": "Nowgong"
        },
        {
          "city": "Nowrozabad (Khodargama)"
        },
        {
          "city": "Pachore"
        },
        {
          "city": "Pali"
        },
        {
          "city": "Panagar"
        },
        {
          "city": "Pandhurna"
        },
        {
          "city": "Panna"
        },
        {
          "city": "Pasan"
        },
        {
          "city": "Pipariya"
        },
        {
          "city": "Pithampur"
        },
        {
          "city": "Porsa"
        },
        {
          "city": "Prithvipur"
        },
        {
          "city": "Raghogarh-Vijaypur"
        },
        {
          "city": "Rahatgarh"
        },
        {
          "city": "Raisen"
        },
        {
          "city": "Rajgarh"
        },
        {
          "city": "Ratlam"
        },
        {
          "city": "Rau"
        },
        {
          "city": "Rehli"
        },
        {
          "city": "Rewa"
        },
        {
          "city": "Sabalgarh"
        },
        {
          "city": "Sagar"
        },
        {
          "city": "Sanawad"
        },
        {
          "city": "Sarangpur"
        },
        {
          "city": "Sarni"
        },
        {
          "city": "Satna"
        },
        {
          "city": "Sausar"
        },
        {
          "city": "Sehore"
        },
        {
          "city": "Sendhwa"
        },
        {
          "city": "Seoni"
        },
        {
          "city": "Seoni-Malwa"
        },
        {
          "city": "Shahdol"
        },
        {
          "city": "Shajapur"
        },
        {
          "city": "Shamgarh"
        },
        {
          "city": "Sheopur"
        },
        {
          "city": "Shivpuri"
        },
        {
          "city": "Shujalpur"
        },
        {
          "city": "Sidhi"
        },
        {
          "city": "Sihora"
        },
        {
          "city": "Singrauli"
        },
        {
          "city": "Sironj"
        },
        {
          "city": "Sohagpur"
        },
        {
          "city": "Tarana"
        },
        {
          "city": "Tikamgarh"
        },
        {
          "city": "Ujjain"
        },
        {
          "city": "Umaria"
        },
        {
          "city": "Vidisha"
        },
        {
          "city": "Vijaypur"
        },
        {
          "city": "Wara Seoni"
        }
      ]
    },
    {
      "name": "Maharashtra",
      "cities": [
        {
          "city": "Ahmednagar"
        },
        {
          "city": "Akola"
        },
        {
          "city": "Akot"
        },
        {
          "city": "Amalner"
        },
        {
          "city": "Ambejogai"
        },
        {
          "city": "Amravati"
        },
        {
          "city": "Anjangaon"
        },
        {
          "city": "Arvi"
        },
        {
          "city": "Aurangabad"
        },
        {
          "city": "Bhiwandi"
        },
        {
          "city": "Dhule"
        },
        {
          "city": "Kalyan-Dombivali"
        },
        {
          "city": "Ichalkaranji"
        },
        {
          "city": "Kalyan-Dombivali"
        },
        {
          "city": "Karjat"
        },
        {
          "city": "Latur"
        },
        {
          "city": "Loha"
        },
        {
          "city": "Lonar"
        },
        {
          "city": "Lonavla"
        },
        {
          "city": "Mahad"
        },
        {
          "city": "Malegaon"
        },
        {
          "city": "Malkapur"
        },
        {
          "city": "Mangalvedhe"
        },
        {
          "city": "Mangrulpir"
        },
        {
          "city": "Manjlegaon"
        },
        {
          "city": "Manmad"
        },
        {
          "city": "Manwath"
        },
        {
          "city": "Mehkar"
        },
        {
          "city": "Mhaswad"
        },
        {
          "city": "Mira-Bhayandar"
        },
        {
          "city": "Morshi"
        },
        {
          "city": "Mukhed"
        },
        {
          "city": "Mul"
        },
        {
          "city": "Greater Mumbai*"
        },
        {
          "city": "Murtijapur"
        },
        {
          "city": "Nagpur"
        },
        {
          "city": "Nanded-Waghala"
        },
        {
          "city": "Nandgaon"
        },
        {
          "city": "Nandura"
        },
        {
          "city": "Nandurbar"
        },
        {
          "city": "Narkhed"
        },
        {
          "city": "Nashik"
        },
        {
          "city": "Navi Mumbai"
        },
        {
          "city": "Nawapur"
        },
        {
          "city": "Nilanga"
        },
        {
          "city": "Osmanabad"
        },
        {
          "city": "Ozar"
        },
        {
          "city": "Pachora"
        },
        {
          "city": "Paithan"
        },
        {
          "city": "Palghar"
        },
        {
          "city": "Pandharkaoda"
        },
        {
          "city": "Pandharpur"
        },
        {
          "city": "Panvel"
        },
        {
          "city": "Parbhani"
        },
        {
          "city": "Parli"
        },
        {
          "city": "Partur"
        },
        {
          "city": "Pathardi"
        },
        {
          "city": "Pathri"
        },
        {
          "city": "Patur"
        },
        {
          "city": "Pauni"
        },
        {
          "city": "Pen"
        },
        {
          "city": "Phaltan"
        },
        {
          "city": "Pulgaon"
        },
        {
          "city": "Pune"
        },
        {
          "city": "Purna"
        },
        {
          "city": "Pusad"
        },
        {
          "city": "Rahuri"
        },
        {
          "city": "Rajura"
        },
        {
          "city": "Ramtek"
        },
        {
          "city": "Ratnagiri"
        },
        {
          "city": "Raver"
        },
        {
          "city": "Risod"
        },
        {
          "city": "Sailu"
        },
        {
          "city": "Sangamner"
        },
        {
          "city": "Sangli"
        },
        {
          "city": "Sangole"
        },
        {
          "city": "Sasvad"
        },
        {
          "city": "Satana"
        },
        {
          "city": "Satara"
        },
        {
          "city": "Savner"
        },
        {
          "city": "Sawantwadi"
        },
        {
          "city": "Shahade"
        },
        {
          "city": "Shegaon"
        },
        {
          "city": "Shendurjana"
        },
        {
          "city": "Shirdi"
        },
        {
          "city": "Shirpur-Warwade"
        },
        {
          "city": "Shirur"
        },
        {
          "city": "Shrigonda"
        },
        {
          "city": "Shrirampur"
        },
        {
          "city": "Sillod"
        },
        {
          "city": "Sinnar"
        },
        {
          "city": "Solapur"
        },
        {
          "city": "Soyagaon"
        },
        {
          "city": "Talegaon Dabhade"
        },
        {
          "city": "Talode"
        },
        {
          "city": "Tasgaon"
        },
        {
          "city": "Thane"
        },
        {
          "city": "Tirora"
        },
        {
          "city": "Tuljapur"
        },
        {
          "city": "Tumsar"
        },
        {
          "city": "Uchgaon"
        },
        {
          "city": "Udgir"
        },
        {
          "city": "Umarga"
        },
        {
          "city": "Umarkhed"
        },
        {
          "city": "Umred"
        },
        {
          "city": "Uran"
        },
        {
          "city": "Uran Islampur"
        },
        {
          "city": "Vadgaon Kasba"
        },
        {
          "city": "Vaijapur"
        },
        {
          "city": "Vasai-Virar"
        },
        {
          "city": "Vita"
        },
        {
          "city": "Wadgaon Road"
        },
        {
          "city": "Wai"
        },
        {
          "city": "Wani"
        },
        {
          "city": "Wardha"
        },
        {
          "city": "Warora"
        },
        {
          "city": "Warud"
        },
        {
          "city": "Washim"
        },
        {
          "city": "Yavatmal"
        },
        {
          "city": "Yawal"
        },
        {
          "city": "Yevla"
        }
      ]
    },
    {
      "name": "Manipur",
      "cities": [
        {
          "city": "Imphal*"
        },
        {
          "city": "Lilong"
        },
        {
          "city": "Mayang Imphal"
        },
        {
          "city": "Thoubal"
        }
      ]
    },
    {
      "name": "Meghalaya",
      "cities": [
        {
          "city": "Nongstoin"
        },
        {
          "city": "Shillong*"
        },
        {
          "city": "Tura"
        }
      ]
    },
    {
      "name": "Mizoram",
      "cities": [
        {
          "city": "Aizawl"
        },
        {
          "city": "Lunglei"
        },
        {
          "city": "Saiha"
        }
      ]
    },
    {
      "name": "Nagaland",
      "cities": [
        {
          "city": "Dimapur"
        },
        {
          "city": "Kohima*"
        },
        {
          "city": "Mokokchung"
        },
        {
          "city": "Tuensang"
        },
        {
          "city": "Wokha"
        },
        {
          "city": "Zunheboto"
        }
      ]
    },
    {
      "name": "Odisha",
      "cities": [
        {
          "city": "Balangir"
        },
        {
          "city": "Baleshwar Town"
        },
        {
          "city": "Barbil"
        },
        {
          "city": "Bargarh"
        },
        {
          "city": "Baripada Town"
        },
        {
          "city": "Bhadrak"
        },
        {
          "city": "Bhawanipatna"
        },
        {
          "city": "Bhubaneswar*"
        },
        {
          "city": "Brahmapur"
        },
        {
          "city": "Byasanagar"
        },
        {
          "city": "Cuttack"
        },
        {
          "city": "Dhenkanal"
        },
        {
          "city": "Jatani"
        },
        {
          "city": "Jharsuguda"
        },
        {
          "city": "Kendrapara"
        },
        {
          "city": "Kendujhar"
        },
        {
          "city": "Malkangiri"
        },
        {
          "city": "Nabarangapur"
        },
        {
          "city": "Paradip"
        },
        {
          "city": "Parlakhemundi"
        },
        {
          "city": "Pattamundai"
        },
        {
          "city": "Phulabani"
        },
        {
          "city": "Puri"
        },
        {
          "city": "Rairangpur"
        },
        {
          "city": "Rajagangapur"
        },
        {
          "city": "Raurkela"
        },
        {
          "city": "Rayagada"
        },
        {
          "city": "Sambalpur"
        },
        {
          "city": "Soro"
        },
        {
          "city": "Sunabeda"
        },
        {
          "city": "Sundargarh"
        },
        {
          "city": "Talcher"
        },
        {
          "city": "Tarbha"
        },
        {
          "city": "Titlagarh"
        }
      ]
    },
    {
      "name": "Puducherry",
      "cities": [
        {
          "city": "Karaikal"
        },
        {
          "city": "Mahe"
        },
        {
          "city": "Pondicherry*"
        },
        {
          "city": "Yanam"
        }
      ]
    },
    {
      "name": "Punjab",
      "cities": [
        {
          "city": "Amritsar"
        },
        {
          "city": "Barnala"
        },
        {
          "city": "Batala"
        },
        {
          "city": "Bathinda"
        },
        {
          "city": "Dhuri"
        },
        {
          "city": "Faridkot"
        },
        {
          "city": "Fazilka"
        },
        {
          "city": "Firozpur"
        },
        {
          "city": "Firozpur Cantt."
        },
        {
          "city": "Gobindgarh"
        },
        {
          "city": "Gurdaspur"
        },
        {
          "city": "Hoshiarpur"
        },
        {
          "city": "Jagraon"
        },
        {
          "city": "Jalandhar Cantt."
        },
        {
          "city": "Jalandhar"
        },
        {
          "city": "Kapurthala"
        },
        {
          "city": "Khanna"
        },
        {
          "city": "Kharar"
        },
        {
          "city": "Kot Kapura"
        },
        {
          "city": "Longowal"
        },
        {
          "city": "Ludhiana"
        },
        {
          "city": "Malerkotla"
        },
        {
          "city": "Malout"
        },
        {
          "city": "Mansa"
        },
        {
          "city": "Moga"
        },
        {
          "city": "Mohali"
        },
        {
          "city": "Morinda, India"
        },
        {
          "city": "Mukerian"
        },
        {
          "city": "Muktsar"
        },
        {
          "city": "Nabha"
        },
        {
          "city": "Nakodar"
        },
        {
          "city": "Nangal"
        },
        {
          "city": "Nawanshahr"
        },
        {
          "city": "Pathankot"
        },
        {
          "city": "Patiala"
        },
        {
          "city": "Pattran"
        },
        {
          "city": "Patti"
        },
        {
          "city": "Phagwara"
        },
        {
          "city": "Phillaur"
        },
        {
          "city": "Qadian"
        },
        {
          "city": "Raikot"
        },
        {
          "city": "Rajpura"
        },
        {
          "city": "Rampura Phul"
        },
        {
          "city": "Rupnagar"
        },
        {
          "city": "Samana"
        },
        {
          "city": "Sangrur"
        },
        {
          "city": "Sirhind Fatehgarh Sahib"
        },
        {
          "city": "Sujanpur"
        },
        {
          "city": "Sunam"
        },
        {
          "city": "Talwara"
        },
        {
          "city": "Tarn Taran"
        },
        {
          "city": "Urmar Tanda"
        },
        {
          "city": "Zira"
        },
        {
          "city": "Zirakpur"
        }
      ]
    },
    {
      "name": "Rajasthan",
      "cities": [
        {
          "city": "Ajmer"
        },
        {
          "city": "Alwar"
        },
        {
          "city": "Bikaner"
        },
        {
          "city": "Bharatpur"
        },
        {
          "city": "Bhilwara"
        },
        {
          "city": "Jaipur*"
        },
        {
          "city": "Jodhpur"
        },
        {
          "city": "Lachhmangarh"
        },
        {
          "city": "Ladnu"
        },
        {
          "city": "Lakheri"
        },
        {
          "city": "Lalsot"
        },
        {
          "city": "Losal"
        },
        {
          "city": "Makrana"
        },
        {
          "city": "Malpura"
        },
        {
          "city": "Mandalgarh"
        },
        {
          "city": "Mandawa"
        },
        {
          "city": "Mangrol"
        },
        {
          "city": "Merta City"
        },
        {
          "city": "Mount Abu"
        },
        {
          "city": "Nadbai"
        },
        {
          "city": "Nagar"
        },
        {
          "city": "Nagaur"
        },
        {
          "city": "Nasirabad"
        },
        {
          "city": "Nathdwara"
        },
        {
          "city": "Neem-Ka-Thana"
        },
        {
          "city": "Nimbahera"
        },
        {
          "city": "Nohar"
        },
        {
          "city": "Nokha"
        },
        {
          "city": "Pali"
        },
        {
          "city": "Phalodi"
        },
        {
          "city": "Phulera"
        },
        {
          "city": "Pilani"
        },
        {
          "city": "Pilibanga"
        },
        {
          "city": "Pindwara"
        },
        {
          "city": "Pipar City"
        },
        {
          "city": "Prantij"
        },
        {
          "city": "Pratapgarh"
        },
        {
          "city": "Raisinghnagar"
        },
        {
          "city": "Rajakhera"
        },
        {
          "city": "Rajaldesar"
        },
        {
          "city": "Rajgarh (Alwar)"
        },
        {
          "city": "Rajgarh (Churu)"
        },
        {
          "city": "Rajsamand"
        },
        {
          "city": "Ramganj Mandi"
        },
        {
          "city": "Ramngarh"
        },
        {
          "city": "Ratangarh"
        },
        {
          "city": "Rawatbhata"
        },
        {
          "city": "Rawatsar"
        },
        {
          "city": "Reengus"
        },
        {
          "city": "Sadri"
        },
        {
          "city": "Sadulshahar"
        },
        {
          "city": "Sadulpur"
        },
        {
          "city": "Sagwara"
        },
        {
          "city": "Sambhar"
        },
        {
          "city": "Sanchore"
        },
        {
          "city": "Sangaria"
        },
        {
          "city": "Sardarshahar"
        },
        {
          "city": "Sawai Madhopur"
        },
        {
          "city": "Shahpura"
        },
        {
          "city": "Shahpura"
        },
        {
          "city": "Sheoganj"
        },
        {
          "city": "Sikar"
        },
        {
          "city": "Sirohi"
        },
        {
          "city": "Sojat"
        },
        {
          "city": "Sri Madhopur"
        },
        {
          "city": "Sujangarh"
        },
        {
          "city": "Sumerpur"
        },
        {
          "city": "Suratgarh"
        },
        {
          "city": "Taranagar"
        },
        {
          "city": "Todabhim"
        },
        {
          "city": "Todaraisingh"
        },
        {
          "city": "Tonk"
        },
        {
          "city": "Udaipur"
        },
        {
          "city": "Udaipurwati"
        },
        {
          "city": "Vijainagar, Ajmer"
        }
      ]
    },
    {
      "name": "Tamil Nadu",
      "cities": [
        {
          "city": "Arakkonam"
        },
        {
          "city": "Aruppukkottai"
        },
        {
          "city": "Chennai*"
        },
        {
          "city": "Coimbatore"
        },
        {
          "city": "Erode"
        },
        {
          "city": "Gobichettipalayam"
        },
        {
          "city": "Kancheepuram"
        },
        {
          "city": "Karur"
        },
        {
          "city": "Lalgudi"
        },
        {
          "city": "Madurai"
        },
        {
          "city": "Manachanallur"
        },
        {
          "city": "Nagapattinam"
        },
        {
          "city": "Nagercoil"
        },
        {
          "city": "Namagiripettai"
        },
        {
          "city": "Namakkal"
        },
        {
          "city": "Nandivaram-Guduvancheri"
        },
        {
          "city": "Nanjikottai"
        },
        {
          "city": "Natham"
        },
        {
          "city": "Nellikuppam"
        },
        {
          "city": "Neyveli (TS)"
        },
        {
          "city": "Valley"
        },
        {
          "city": "Oddanchatram"
        },
        {
          "city": "P.N.Patti"
        },
        {
          "city": "Pacode"
        },
        {
          "city": "Palani"
        },
        {
          "city": "Palladam"
        },
        {
          "city": "Pallapatti"
        },
        {
          "city": "Pallikonda"
        },
        {
          "city": "Panagudi"
        },
        {
          "city": "Panruti"
        },
        {
          "city": "Paramakudi"
        },
        {
          "city": "Parangipettai"
        },
        {
          "city": "Pattukkottai"
        },
        {
          "city": "Perambalur"
        },
        {
          "city": "Peravurani"
        },
        {
          "city": "Periyakulam"
        },
        {
          "city": "Periyasemur"
        },
        {
          "city": "Pernampattu"
        },
        {
          "city": "Pollachi"
        },
        {
          "city": "Polur"
        },
        {
          "city": "Ponneri"
        },
        {
          "city": "Pudukkottai"
        },
        {
          "city": "Pudupattinam"
        },
        {
          "city": "Puliyankudi"
        },
        {
          "city": "Punjaipugalur"
        },
        {
          "city": "Ranipet"
        },
        {
          "city": "Rajapalayam"
        },
        {
          "city": "Ramanathapuram"
        },
        {
          "city": "Rameshwaram"
        },
        {
          "city": "Rasipuram"
        },
        {
          "city": "Salem"
        },
        {
          "city": "Sankarankoil"
        },
        {
          "city": "Sankari"
        },
        {
          "city": "Sathyamangalam"
        },
        {
          "city": "Sattur"
        },
        {
          "city": "Shenkottai"
        },
        {
          "city": "Sholavandan"
        },
        {
          "city": "Sholingur"
        },
        {
          "city": "Sirkali"
        },
        {
          "city": "Sivaganga"
        },
        {
          "city": "Sivagiri"
        },
        {
          "city": "Sivakasi"
        },
        {
          "city": "Srivilliputhur"
        },
        {
          "city": "Surandai"
        },
        {
          "city": "Suriyampalayam"
        },
        {
          "city": "Tenkasi"
        },
        {
          "city": "Thammampatti"
        },
        {
          "city": "Thanjavur"
        },
        {
          "city": "Tharamangalam"
        },
        {
          "city": "Tharangambadi"
        },
        {
          "city": "Theni Allinagaram"
        },
        {
          "city": "Thirumangalam"
        },
        {
          "city": "Thirupuvanam"
        },
        {
          "city": "Thiruthuraipoondi"
        },
        {
          "city": "Thiruvallur"
        },
        {
          "city": "Thiruvarur"
        },
        {
          "city": "Thuraiyur"
        },
        {
          "city": "Tindivanam"
        },
        {
          "city": "Tiruchendur"
        },
        {
          "city": "Tiruchengode"
        },
        {
          "city": "Tiruchirappalli"
        },
        {
          "city": "Tirukalukundram"
        },
        {
          "city": "Tirukkoyilur"
        },
        {
          "city": "Tirunelveli"
        },
        {
          "city": "Tirupathur"
        },
        {
          "city": "Tirupathur"
        },
        {
          "city": "Tiruppur"
        },
        {
          "city": "Tiruttani"
        },
        {
          "city": "Tiruvannamalai"
        },
        {
          "city": "Tiruvethipuram"
        },
        {
          "city": "Tittakudi"
        },
        {
          "city": "Udhagamandalam"
        },
        {
          "city": "Udumalaipettai"
        },
        {
          "city": "Unnamalaikadai"
        },
        {
          "city": "Usilampatti"
        },
        {
          "city": "Uthamapalayam"
        },
        {
          "city": "Uthiramerur"
        },
        {
          "city": "Vadakkuvalliyur"
        },
        {
          "city": "Vadalur"
        },
        {
          "city": "Vadipatti"
        },
        {
          "city": "Valparai"
        },
        {
          "city": "Vandavasi"
        },
        {
          "city": "Vaniyambadi"
        },
        {
          "city": "Vedaranyam"
        },
        {
          "city": "Vellakoil"
        },
        {
          "city": "Vellore"
        },
        {
          "city": "Vikramasingapuram"
        },
        {
          "city": "Viluppuram"
        },
        {
          "city": "Virudhachalam"
        },
        {
          "city": "Virudhunagar"
        },
        {
          "city": "Viswanatham"
        }
      ]
    },
    {
      "name": "Telangana",
      "cities": [
        {
          "city": "Adilabad"
        },
        {
          "city": "Bellampalle"
        },
        {
          "city": "Bhadrachalam"
        },
        {
          "city": "Bhainsa"
        },
        {
          "city": "Bhongir"
        },
        {
          "city": "Bodhan"
        },
        {
          "city": "Farooqnagar"
        },
        {
          "city": "Gadwal"
        },
        {
          "city": "Hyderabad*"
        },
        {
          "city": "Jagtial"
        },
        {
          "city": "Jangaon"
        },
        {
          "city": "Kagaznagar"
        },
        {
          "city": "Kamareddy"
        },
        {
          "city": "Karimnagar"
        },
        {
          "city": "Khammam"
        },
        {
          "city": "Koratla"
        },
        {
          "city": "Kothagudem"
        },
        {
          "city": "Kyathampalle"
        },
        {
          "city": "Mahbubnagar"
        },
        {
          "city": "Mancherial"
        },
        {
          "city": "Mandamarri"
        },
        {
          "city": "Manuguru"
        },
        {
          "city": "Medak"
        },
        {
          "city": "Miryalaguda"
        },
        {
          "city": "Nagarkurnool"
        },
        {
          "city": "Narayanpet"
        },
        {
          "city": "Nirmal"
        },
        {
          "city": "Nizamabad"
        },
        {
          "city": "Palwancha"
        },
        {
          "city": "Ramagundam"
        },
        {
          "city": "Sadasivpet"
        },
        {
          "city": "Sangareddy"
        },
        {
          "city": "Siddipet"
        },
        {
          "city": "Sircilla"
        },
        {
          "city": "Suryapet"
        },
        {
          "city": "Tandur"
        },
        {
          "city": "Vikarabad"
        },
        {
          "city": "Wanaparthy"
        },
        {
          "city": "Warangal"
        },
        {
          "city": "Yellandu"
        }

      ]
    },
    {
      "name": "Tripura",
      "cities": [
        {
          "city": "Agartala*"
        },
        {
          "city": "Belonia"
        },
        {
          "city": "Dharmanagar"
        },
        {
          "city": "Kailasahar"
        },
        {
          "city": "Khowai"
        },
        {
          "city": "Pratapgarh"
        },
        {
          "city": "Udaipur"
        }
      ]
    },
    {
      "name": "Uttar Pradesh",
      "cities": [
        {
          "city": "Achhnera"
        },
        {
          "city": "Agra"
        },
        {
          "city": "Aligarh"
        },
        {
          "city": "Allahabad"
        },
        {
          "city": "Amroha"
        },
        {
          "city": "Azamgarh"
        },
        {
          "city": "Bahraich"
        },
        {
          "city": "Chandausi"
        },
        {
          "city": "Etawah"
        },
        {
          "city": "Firozabad"
        },
        {
          "city": "Fatehpur Sikri"
        },
        {
          "city": "Hapur"
        },
        {
          "city": "Hardoi *"
        },
        {
          "city": "Jhansi"
        },
        {
          "city": "Kalpi"
        },
        {
          "city": "Kanpur"
        },
        {
          "city": "Khair"
        },
        {
          "city": "Laharpur"
        },
        {
          "city": "Lakhimpur"
        },
        {
          "city": "Lal Gopalganj Nindaura"
        },
        {
          "city": "Lalitpur"
        },
        {
          "city": "Lalganj"
        },
        {
          "city": "Lar"
        },
        {
          "city": "Loni"
        },
        {
          "city": "Lucknow*"
        },
        {
          "city": "Mathura"
        },
        {
          "city": "Meerut"
        },
        {
          "city": "Modinagar"
        },
        {
          "city": "Moradabad"
        },
        {
          "city": "Nagina"
        },
        {
          "city": "Najibabad"
        },
        {
          "city": "Nakur"
        },
        {
          "city": "Nanpara"
        },
        {
          "city": "Naraura"
        },
        {
          "city": "Naugawan Sadat"
        },
        {
          "city": "Nautanwa"
        },
        {
          "city": "Nawabganj"
        },
        {
          "city": "Nehtaur"
        },
        {
          "city": "Niwai"
        },
        {
          "city": "Noida"
        },
        {
          "city": "Noorpur"
        },
        {
          "city": "Obra"
        },
        {
          "city": "Orai"
        },
        {
          "city": "Padrauna"
        },
        {
          "city": "Palia Kalan"
        },
        {
          "city": "Parasi"
        },
        {
          "city": "Phulpur"
        },
        {
          "city": "Pihani"
        },
        {
          "city": "Pilibhit"
        },
        {
          "city": "Pilkhuwa"
        },
        {
          "city": "Powayan"
        },
        {
          "city": "Pukhrayan"
        },
        {
          "city": "Puranpur"
        },
        {
          "city": "Purquazi"
        },
        {
          "city": "Purwa"
        },
        {
          "city": "Rae Bareli"
        },
        {
          "city": "Rampur"
        },
        {
          "city": "Rampur Maniharan"
        },
        {
          "city": "Rampur Maniharan"
        },
        {
          "city": "Rasra"
        },
        {
          "city": "Rath"
        },
        {
          "city": "Renukoot"
        },
        {
          "city": "Reoti"
        },
        {
          "city": "Robertsganj"
        },
        {
          "city": "Rudauli"
        },
        {
          "city": "Rudrapur"
        },
        {
          "city": "Sadabad"
        },
        {
          "city": "Safipur"
        },
        {
          "city": "Saharanpur"
        },
        {
          "city": "Sahaspur"
        },
        {
          "city": "Sahaswan"
        },
        {
          "city": "Sahawar"
        },
        {
          "city": "Sahjanwa"
        },
        {
          "city": "Saidpur"
        },
        {
          "city": "Sambhal"
        },
        {
          "city": "Samdhan"
        },
        {
          "city": "Samthar"
        },
        {
          "city": "Sandi"
        },
        {
          "city": "Sandila"
        },
        {
          "city": "Sardhana"
        },
        {
          "city": "Seohara"
        },
        {
          "city": "Shahabad, Hardoi"
        },
        {
          "city": "Shahabad, Rampur"
        },
        {
          "city": "Shahganj"
        },
        {
          "city": "Shahjahanpur"
        },
        {
          "city": "Shamli"
        },
        {
          "city": "Shamsabad, Agra"
        },
        {
          "city": "Shamsabad, Farrukhabad"
        },
        {
          "city": "Sherkot"
        },
        {
          "city": "Shikarpur, Bulandshahr"
        },
        {
          "city": "Shikohabad"
        },
        {
          "city": "Shishgarh"
        },
        {
          "city": "Siana"
        },
        {
          "city": "Sikanderpur"
        },
        {
          "city": "Sikandra Rao"
        },
        {
          "city": "Sikandrabad"
        },
        {
          "city": "Sirsaganj"
        },
        {
          "city": "Sirsi"
        },
        {
          "city": "Sitapur"
        },
        {
          "city": "Soron"
        },
        {
          "city": "Suar"
        },
        {
          "city": "Sultanpur"
        },
        {
          "city": "Sumerpur"
        },
        {
          "city": "Tanda"
        },
        {
          "city": "Thakurdwara"
        },
        {
          "city": "Thana Bhawan"
        },
        {
          "city": "Tilhar"
        },
        {
          "city": "Tirwaganj"
        },
        {
          "city": "Tulsipur"
        },
        {
          "city": "Tundla"
        },
        {
          "city": "Ujhani"
        },
        {
          "city": "Unnao"
        },
        {
          "city": "Utraula"
        },
        {
          "city": "Varanasi"
        },
        {
          "city": "Vrindavan"
        },
        {
          "city": "Warhapur"
        },
        {
          "city": "Zaidpur"
        },
        {
          "city": "Zamania"
        }
      ]
    },
    {
      "name": "Uttarakhand",
      "cities": [
        {
          "city": "Bageshwar"
        },
        {
          "city": "Dehradun"
        },
        {
          "city": "Haldwani-cum-Kathgodam"
        },
        {
          "city": "Hardwar"
        },
        {
          "city": "Kashipur"
        },
        {
          "city": "Manglaur"
        },
        {
          "city": "Mussoorie"
        },
        {
          "city": "Nagla"
        },
        {
          "city": "Nainital"
        },
        {
          "city": "Pauri"
        },
        {
          "city": "Pithoragarh"
        },
        {
          "city": "Ramnagar"
        },
        {
          "city": "Rishikesh"
        },
        {
          "city": "Roorkee"
        },
        {
          "city": "Rudrapur"
        },
        {
          "city": "Sitarganj"
        },
        {
          "city": "Srinagar"
        },
        {
          "city": "Tehri"
        }

      ]
    }

  ]
  userInfo: UserInformation;
  guestLogin: any;
  currentOrderList: any[] = [];
  recordFound: boolean = false;
  firstTime: boolean = false;

  private productList: any[] = [];
  /* private newqty: number;
   private price: number = 0;*/
  private totalPrice: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireOfflineDatabase, public storage: NativeStorage, public popoverCtrt: PopoverController, public auth: AuthenicateServiceProvider, public orderConfirm: OrderconfirmationserviceProvider, public productService: ProductServiceProvider) {

    if (navParams.get( "orderplacementList" )) {
      this.productList = navParams.get( "orderplacementList" );

    }

    if (this.productList.length > 0) {
      console.log( this.productList );
      this.totalPrice = 0;
      for (let product of this.productList) {
        if (product.productSpecficationInfo.length > 0) {
          for (let specification of product.productSpecficationInfo) {
            this.totalPrice += product.qty * specification.price;
          }
        }


      }

      this.grandTotalPrice = this.totalPrice + this.shippingPrice;

    }
    this.countryListNew = this.db.list( "/countries" );

    if (window.localStorage.getItem( "user" ) != null) {
      let userInfos = JSON.parse( window.localStorage.getItem( "user" ) );
      //console.log(userInfos);
      this.userInfo = new UserInformation( userInfos.fname, userInfos.mname, userInfos.lname, userInfos.address, userInfos.contactNumber, userInfos.aptNumber, userInfos.address1, userInfos.altContact,userInfos.email, userInfos.userType );
      console.log( this.userInfo );
    }


  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad OrderDetailPage' );
  }

  productRemove(product, i) {

    console.log( product + "index" + i );
    if (product != null) {

      if (product.productSpecficationInfo.length > 0) {
        for (let specificationInfo of product.productSpecficationInfo) {
          this.totalPrice -= (product.qty * specificationInfo.price);
          this.grandTotalPrice -= (product.qty * specificationInfo.price);
        }
      }
      this.productList.splice( i, 1 );
    }

    return this.productList;

  }

  getGrandTotal() {
    if (this.shippingPrice > 0) {
      this.grandTotalPrice = this.totalPrice + this.shippingPrice;
    } else {
      this.grandTotalPrice = this.totalPrice;
    }

  }

  onSelectCountry(countryId) {

    if (countryId) {
      this.countryListNew = this.db.list( "/countries" );
      this.countryListNew.subscribe( (items) => {
        console.log( "inside the country list information" );
        items.filter( item => {
          for (let states of item.states) {
            if (states.countryId == countryId) {
              this.statesList.push( states );
            }
          }

        } );


      } );
    }
  }

  onStateSelection(stateName) {
    for (let i = 0; i < this.citiesList.length; i++) {
      if (this.citiesList[i].name == stateName) {
        this.cityList = this.citiesList[i].cities;
        break;
      }
    }

  }

  saveOrderInfo(orderForm, productList) {
    let orderId;

    if (orderForm && productList) {
      return new Promise( (resolve, reject) => {

        this.orderInfoList = this.orderConfirm.getOrderDetais();

        this.orderInfoList.subscribe( results => {

          if (results.length > 0) {
            orderId = results[results.length - 1].orderid;

            for (let item of results) {

              if (item.orderid == orderId) {
                this.recordFound = true;
                orderId = orderId + 1;
                resolve( orderId );
                break;
              }
            }

          } else {
            console.log( "inside the else part" );
            orderId = 1000;
            this.firstTime = true;
            reject( orderId );
          }
        } );
      } ).then( res => {

        this.productService.updateProductInventory( productList );

        this.orderConfirm.saveOrderDetails( orderForm, productList, this.grandTotalPrice, res, this.userInfo ).then(
          result => {

            console.log( "inside the order save detauls result" );
            console.log( result );
            this.navCtrl.push( OrderConfirmationPage, {"orderInfo": result} );
          }
        );
      } ).catch( err => {
        console.log( err );
        if (this.firstTime) {
          this.productService.updateProductInventory( productList );
          this.orderConfirm.saveOrderDetails( orderForm, productList, this.grandTotalPrice, err, this.userInfo ).then(
            res => {

              this.navCtrl.push( OrderConfirmationPage, {"orderInfo": res} );
            }
          );
        }

      } );
    }
  }

 /* updateProductInventory(productList) {
    console.log( 'inside the update product inventory method' );
    if (productList) {
      for (let product of productList) {
        //write the logic to search for the product and update the inventory item


        for (let spec of product.productSpecficationInfo) {
          spec.skuStock = spec.skuStock - product.qty;

        }

      }
    }

    return productList;
  }*/

  showLogin() {
    let popover = this.popoverCtrt.create( LoginPage );
    popover.present();
    //  console.log( this.navParams.get('user') );
    //   console.log(this.user);
    popover.onDidDismiss( (popoverData) => {
      this.userInfo = popoverData;
      console.log( "getting the userinformation" );
      console.log( this.userInfo );
    } );
  }

  logOff() {
    console.log( 'inside the log off functionality' );
    this.auth.logOut();
    window.localStorage.removeItem( "user" );
    this.userInfo = new UserInformation( "", "", "", "", 0, "", "", 0,"","" );
    this.navCtrl.setRoot(LoginPage).then(() =>{
      this.navCtrl.popToRoot();
    });
  }

  activateGuestCheckout() {

    this.userInfo = new UserInformation( "", "", "", "", 0, "", "", 0,"","" );

  }
}
