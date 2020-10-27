import React ,{ useEffect, useRef, useState }from 'react';
import { View,TouchableOpacity , Text, TextInput,Image,FlatList,ScrollView, Modal, TouchableHighlight} from 'react-native';
import  {  reduxConnect } from '../../../controllers/Encaissement';

import Button from '../../components/Button';
import ButtonWithIcon from '../../components/ButtonWithIcon';

import { STRING } from '../../../data/Constants'
import {styles} from './styles';
import Popup from '../../components/Popup';
import ItemPaiement from '../../components/ItemPaiement';
import Popover from 'react-native-popover-view';
import ViewTooltip from '../../components/ViewTooltip';
import {StackNavigationProp,RouteProp} from '@react-navigation/stack';

import {StackParams} from '../../navigation';
import TextWithResult from '../../components/TextWithResult';
import { useAppTickets } from '../../../services/applicatif/tickets';
import { toDatetime } from '../../../services/utils';
import PopupWithTextInput from '../../components/PopupWithTextInput';
let articlesList:Array<Panier> = [];
type NavigationProps = StackNavigationProp<StackParams, 'Paiement'>;
type Route = RouteProp<StackParams, 'Paiement'>;
export class Panier{
    code:string;
    mode:string;
    total:number;
    devise:string;
    valid:string;
    constructor(code:string,mode: string,total:number,devise:string,valid:string){
            this.code = code;
            this.mode = mode;
            this.total = total;
            this.valid = valid;
            this.devise = devise;

    }
    
}
 interface Props {
    
    navigation: NavigationProps;
    route: Route;
  }
export const PaiementScreen : React.FunctionComponent<Props> = function (props) {
    const [articles, setArticles] = useState(Array<Panier>());
    const { insertTicketsPaiements,insertTickets } = useAppTickets();
    const [client, setClient] = useState('');
    const { navigation ,route} = props;
    const [codeChoisi, setCodeChoisi] = useState(false);
    const [montantRegleValue, setMontantRegleValue] = useState(0);
    const [devisesRegleValue, setDeviseRegleValue] = useState('');
    const [visibility, setVisibility] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSuccessPaie, setModalVisibleSuccessPaie] = useState(false);

    const [codePaieAbbreviation, setCodePaieAbbreviation] = useState('');
    const [codePaieTout, setCodePaieTout] = useState('');
    const [modalVisibleMiseAttente,setModalVisibleMiseAttente] = useState(false);
    const [modalVisibleAnnulerVente,setModalVisibleAnnulerVente] = useState(false);
    const {montantregle,articleTotal,newTicketsASauver} = route.params;
    const [modalVisibleMotifAnnulation,setModalVisibleMotifAnnulation] = useState(false);
    //articleTotal = 12 EUR = value + devise
    useEffect(() => {
      
       console.log('iscodechoisi',route.params.iscodechoisi);
       setCodeChoisi(route.params.iscodechoisi);
       //getPanierAPayer();
    },[route.params.iscodechoisi]);
    useEffect(() => {
        if(montantregle.count){
            setMontantRegleValue(montantregle.count);
        }
        if(montantregle.devises){
            setDeviseRegleValue(montantregle.devises);
        }
        
       
     },[montantregle]);
    useEffect(() => {
        setClient(route.params.clientI.nom+' '+route.params.clientI.prenom);
        
       
     },[]);

    function getPanierAPayer(code:string,mode:string){
        
        let panier:Panier = (new Panier(code,mode,articleTotal.count,articleTotal.devises,""));
        setCodePaieAbbreviation(code);
        setCodePaieTout(mode);
        articlesList.length = 0;
        articlesList.splice(1,1);
        articlesList.push(panier);
        setArticles(articlesList);
    }

   /* function getArticles(){
       let article1:ArticleDto = new ArticleDto('000123','dd',12,'30%',1);
       let article2:ArticleDto = new ArticleDto('000124','Huile',12,'40%',2);
       let article3:ArticleDto = new ArticleDto('000125','Vin',13,'40%',2);
       articlesList.push(article1);
       articlesList.push(article2);
       articlesList.push(article3);
       
       //this.setState({articles:articles});
       setArticles(articlesList);
       
    }*/
    function deleteValue(){

    }
    function goToPaiementCash(){
        setVisibility(false);
        navigation.navigate('PaiementCash',{montant:articleTotal});
    }
    function goToPaiementMode(){
        setVisibility(false);
        navigation.navigate('PaiementMode',{montant:articleTotal});
    }
    function goToPaiementAvoir(){
        setVisibility(false);
        navigation.navigate('PaiementAvoir');
    }
    function goToPaiementCarteCadeau(){
        setVisibility(false);
        navigation.navigate('PaiementCadeau');
    }
    function goToModePaiement(){
        console.log('choix code');
        setVisibility(false);
        setCodeChoisi(true);
        
    }
    async function confirmPaiement(){
        const paym = {
            numero_ticket: newTicketsASauver.numero_ticket,
            numero_ligne: 1,
            mode_paiement: codePaieAbbreviation,
            montant_paiement: articleTotal.count,
            info_paiement: '',
            encaisse: 1,
            user_annulation: '',
            date_annulation: '',
            motif_annulation: '',
          };
          
          await insertTicketsPaiements(paym); //insertion TicketPaiement

          newTicketsASauver.date_fin = toDatetime(new Date());
          newTicketsASauver.statut = 1;
          newTicketsASauver.id_client = route.params.clientI.id_client
          console.log('SAVE',newTicketsASauver);
          const ticket = await insertTickets(newTicketsASauver);  // insertion Ticket
         /* const  ticketDetail= {
            numero_ticket: newTicketsASauver.numero_ticket,
            numero_ligne: 1,
            code_article: '666666666',
            statut: newTicketsASauver.statut,
            user_creation: newTicketsASauver.user_creation,
            date_creation: newTicketsASauver.date_debut,
            user_annulation: '',
            date_annulation: '',
            motif_annulation: '',
            quantite: '',
            motif_remise: '',
            motif_retour: '',
            complement_designation: '',
            user_retour: '',
            prix_base_unitaire_ttc: -59,
            remise_totale_ttc: -5.5,
            tva_totale: 54,
            prix_total_ttc: 3,
            motif_remise_complet: '',
            envoye: '',
            id_promo: '',
          }*/

 ///
 

////
          if(ticket != null){
            setModalVisible(true);
          }
      
        
    }
    function successPaiement(){
        setModalVisible(false);
        setModalVisibleSuccessPaie(true);
    }
    function finishPaiement(){

        setModalVisibleSuccessPaie(false);
        setCodeChoisi(false);
        articlesList = [];
        setArticles(articlesList);
        navigation.navigate('Encaissement',{fromHome:true});
    }
     function selectCB(){
        goToPaiementCash();
        //goToModePaiement()
        
        getPanierAPayer('CB',STRING.CARTE_BLEUE);
    }
     function selectCM(){
        goToPaiementMode();
        //goToModePaiement();
       
        getPanierAPayer('CM',STRING.CARTE_MODE);
    }
     function selectCC() {
        goToPaiementCarteCadeau();
        //goToModePaiement();
        
        getPanierAPayer('CC',STRING.CARTE_CADO);
    }
     function selectAV() {
        goToPaiementAvoir();
        //goToModePaiement();
        getPanierAPayer('AV',STRING.CARTE_AVOIR);
    }
    function showPopupAttente(){
       
        setModalVisibleMiseAttente(true);
    }
    async function mettreEnAttente(){
          newTicketsASauver.date_fin = toDatetime(new Date());
          newTicketsASauver.statut = 0;
          newTicketsASauver.id_client = route.params.clientI.id_client
          console.log('SAVE',newTicketsASauver);
          const ticket = await insertTickets(newTicketsASauver);
          setModalVisibleMiseAttente(false);
          if(ticket != null){
            navigation.navigate('Encaissement',{fromHome:true});
          }
    }
    function showPopupAnnulerVente(){
        setModalVisibleAnnulerVente(true);
    }
    function annulerVente(){
        setModalVisibleAnnulerVente(false);
        showPopupMotifAnnulation();
    }
    function showPopupMotifAnnulation(){
        setModalVisibleMotifAnnulation(true);
    }
    async function enregistrerMotifAnnulation(motif:string){
        newTicketsASauver.date_fin = toDatetime(new Date());
        newTicketsASauver.statut = 0;
        newTicketsASauver.motif_annulation = motif;
        const idC:any = route.params?.clientI.id_client;
        newTicketsASauver.id_client = idC;
        newTicketsASauver.user_annulation = route.params?.item.nom+' '+route.params?.item.prenom,
        console.log('SAVE',newTicketsASauver);
        const ticket = await insertTickets(newTicketsASauver);
        console.log('SAVE1',ticket);
        setModalVisibleMotifAnnulation(false);
        if(ticket != null){
            navigation.navigate('Encaissement',{fromHome:true});
          }
    }
   
    function renderSeparatorView() {
        return (
          <View style={{
              height: 1, 
              width: "100%",
              backgroundColor: "#CEDCCE",
            }}
          />
        );
      }
   
        return (
           
             <View style={{flex: 1,backgroundColor:'white'}}>
            <ScrollView 
            scrollEnabled>
            <View style={styles.container}>
               
               <View style={styles.linearheader}>
                    <View style={styles.box1}>
                        <Text style={styles.txtTitle}>Numéro de ticket</Text>

                        <Text style={styles.txtValue}>{newTicketsASauver.numero_ticket}</Text>
                    </View>
                    <View style={styles.box2}>
                        <Text style={styles.txtTitle}>Vendeur</Text>
                        <Text style={styles.txtValue}>{route.params?.item.nom+' '+route.params?.item.prenom}</Text>
                    </View>
               </View>
               
               <View style={styles.linearclientheader}>
                 <Text style={styles.txtTitle}>Client</Text>
                 <View style={styles.edtStyleCli}>
                    <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        onChangeText={(value) => setClient(value)}
                        value={client}
                        placeholder=''/>
                    
                    <TouchableOpacity style={styles.button} 
                        onPress={() => { 
                            navigation.navigate('Client');
                         }}>
            
                        <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
    
                     </TouchableOpacity>
                 </View>

               </View>
             
               
               
               {codeChoisi ?  <>
                <View style={styles.listContainer}>
                   <View style={styles.chp1}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Code</Text>
                   </View>
                   <View style={styles.chp2}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Mode paiement</Text>
                   </View>
                   <View style={styles.chp3}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Montant</Text>
                   </View>
                   <View style={styles.chp4}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Validé</Text>
                   </View>
               </View>
                        <FlatList
                            style={{ flex: 1 }}
                            data={articles}
                            scrollEnabled={false}
                            ItemSeparatorComponent={renderSeparatorView}
                            renderItem={({ item }) => <ItemPaiement article={item} deleteValue={() => deleteValue()} />} />

                    <View style={styles.result}>
                        <View style={styles.article}>
                            <TextWithResult message='Réglé:' result = {montantRegleValue+ ' ' +devisesRegleValue}></TextWithResult>
                        </View>
                        <View style={styles.total}>
                            <TextWithResult message='A rendre:' result={ (montantRegleValue - articleTotal.count) >= 0 ? (montantRegleValue - articleTotal.count) + ' ' +devisesRegleValue : '0 '+devisesRegleValue} ></TextWithResult>
                        </View>
                        <View style={styles.remise}>
                            <TextWithResult message='Reste à payer:' result={  Math.abs(montantRegleValue - articleTotal.count) + ' ' +devisesRegleValue}></TextWithResult>
                        </View>
                    </View>
                    <View style={[styles.result, {marginTop:20}]}>
                        <View style={styles.article}>
                            <TextWithResult message='Total:' result='0'></TextWithResult>
                        </View>
                        <View style={styles.total}>
                            <TextWithResult message='TVA:' result='0'></TextWithResult>
                        </View>
                        <View style={styles.remise}>
                            <TextWithResult message='Total à payer:' result={articleTotal.count + ' ' +devisesRegleValue}></TextWithResult>
                        </View>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <Button message='Valider paiement'  iscancel={false} onPress={() => confirmPaiement()}></Button>
                    </View></> : null}
              


                
            </View >
           
            </ScrollView>
           
            <View style={styles.bottomview}>
                    <View style={{flex:1}}>
                    <Popover isVisible={visibility}
                             from={(
                                <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={() => setVisibility(true)}>
                                    <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
                                    <Text style={styles.txtstyle}>{STRING.MENU_METHODE_PAIE}</Text>
                                </TouchableOpacity>
                              )}>
                               <ViewTooltip txtOne={STRING.CARTE_BLEUE} txtTwo={STRING.CARTE_MODE}txtThree={STRING.CARTE_CADO}
                               isFourButton={true} txtFour={STRING.CARTE_AVOIR}
                               onPressMenu1={() => selectCB()}
                               onPressMenu2={() => selectCM()} 
                               onPressMenu3={() => selectCC()} 
                               onPressMenu4={() => selectAV()}  />
                        
                        </Popover>  
                   
                    </View> 
                    <View style={{flex:1}}>
                    
                    </View>  
                    <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_ATTENTE} source = {require("../../resources/images/hourglass.png")} onPress={ () => showPopupAttente()}/>
                    </View>  
                    <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_ANN_VENTE} source = {require("../../resources/images/remove_shopping_cart.png")} onPress={ () => showPopupAnnulerVente()}/>
                    </View>          
                        
            </View>
            <Popup modalVisible ={modalVisible} 
                setModalVisible ={setModalVisible} 
                cancelButton = 'Paiement refusé'
                okButton = 'Paiement réussi'
                isTwoButton = {true}
                okAction = {() => successPaiement()}
                             message = {<Text>Impossible d’envoyer le montant sur le TPE. Merci de saisir <Text style={{fontWeight:'bold'}}>manuellement le montant de {articleTotal.count+' '+articleTotal.devises} <Text> sur le TPE.</Text></Text></Text>  } >
                
            </Popup>
            <Modal
        animationType='fade'
        transparent={false}
        visible={modalVisibleSuccessPaie}
        
      >
           <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Paiement réussi. Merci!</Text>
                    <Image style={styles.img} source={require("../../resources/images/flash.png")} />
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#3928A6", marginTop:20 ,marginEnd: 8 ,paddingStart:25,paddingEnd:25}}
                        onPress={() => {
                            finishPaiement();
                        } }
                    >
                        <Text style={styles.textStyle}>Ok</Text>
                    </TouchableHighlight>
                </View>
            </View>
          </Modal>
         
         <Popup message={STRING.TXT_VENTE_EN_COURS_EN_ATTENTE} isTwoButton cancelButton={STRING.Cancel} okButton={STRING.OK}
            okAction={() => mettreEnAttente()}
            modalVisible = {modalVisibleMiseAttente} setModalVisible = {setModalVisibleMiseAttente}/>
         <Popup message={STRING.TXT_ABANDON_VENTE} isTwoButton cancelButton={STRING.Cancel} okButton={STRING.OK}
            okAction={() => annulerVente()}
            modalVisible = {modalVisibleAnnulerVente} setModalVisible = {setModalVisibleAnnulerVente}/>
            
             <PopupWithTextInput message={STRING.TXT_MOTIF_tiCKET} cancelButton={STRING.Cancel} okButton={STRING.OK}
            okAction={(value) => enregistrerMotifAnnulation(value)}
            modalVisible = {modalVisibleMotifAnnulation} setModalVisible = {setModalVisibleMotifAnnulation}/>
     </View>
           
        )
    
}
export const Paiement = reduxConnect(PaiementScreen);