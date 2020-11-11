import React ,{ useEffect, useRef, useState }from 'react';
import { View,TouchableOpacity , Text, TextInput,Image,FlatList,BackHandler} from 'react-native';
import  { Props, reduxConnect } from '../../../controllers/Encaissement';
import Button from '../../components/Button';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import TextWithResult from '../../components/TextWithResult';
import { STRING } from '../../../data/Constants'
import {styles} from './styles';
import Popup from '../../components/Popup';
import Popover from 'react-native-popover-view';
import ViewTooltip from '../../components/ViewTooltip';
import ItemArticle from '../../components/ItemArticle';
import { useAppArticles } from '../../../services/applicatif/articles';
import { ArticleI, ClientI } from '../../../interfaces';
import { useAppTickets } from '../../../services/applicatif/tickets';
import { toDatetime } from '../../../services/utils';
import {  TicketDetails, Tickets } from '../../../interfaces/tickets';
import { useIsFocused } from "@react-navigation/native";
import EncaissementHeader from '../../components/NavigationHeader/encaissement';
import PopupWithTextInput from '../../components/PopupWithTextInput';
import { useCaisseApp } from '../../../services/applicatif/caisses';
import { useAppClients } from '../../../services/applicatif/clients';


const articlesList:Array<ArticleI> = [];
let numligne = 0;
export const EncaissementScreen : React.FunctionComponent<Props> = function (props) {
    const [articles, setArticles] = useState(Array<ArticleI>()); // array articles
    const [count, setCount] = useState(0); //total article
    const [countQt, setCountQT] = useState(0);
    const [nbArticles, setNbArticle] = useState(0); //nombre articles
    const [client, setClient] = useState(''); //client
    const [articleChoisi,setArticleChoisi] = useState('');
    const { navigation,route,system,tickets } = props;
    const [modalVisible, setModalVisible] = useState(false); //popup visibility
    
    const [modalArticleVisible, setModalArticleVisible] = useState(false); 
    const { getArticles } = useAppArticles(); //List articles venant de la base
    const [devises,setDevise] = useState(''); // Euro 
    const {   generateNumeroTickets,insertTicketDetails,insertTickets, getTicketsDetail,updateTicketsDetail} = useAppTickets();
    const { checkCloture } = useCaisseApp();
    const [visibility, setVisibility] = useState(false);
    const { getClients } = useAppClients();
    const [ticketASauver, setTicketASauver] = useState({
        numero_ticket: '',
        statut: 1,
        user_creation: '',
        id_client: '',
        user_annulation: '',
        motif_annulation: '',
        date_debut: toDatetime(new Date()),
        date_fin: toDatetime(new Date()),
        id_cloture: '',
        vendeurs: '',
        synchro_up:0,
       
      });
    const [numeroTickerGenerer, setNumerorTicketGenerer] = useState('');
    
    const [modalVisibleMiseAttente,setModalVisibleMiseAttente] = useState(false);
    const [modalVisibleAnnulerVente,setModalVisibleAnnulerVente] = useState(false);
    const [confirmExit,setConfirmExit] = useState(false);
    const [modalVisibleMotifAnnulation,setModalVisibleMotifAnnulation] = useState(false);
    const [numeroligne, setnumeroligne] = useState(0);
   

    /*
    Code promo
    */
   const [modalVisibleCodePromo,setModalVisibleCodePromo] = useState(false);
   function enregistrerCodePromo(value:string){
    
        setModalVisibleCodePromo(false);
   }
    /*
      gestion ticket en attente
    */
   const [fromHistoTicketAttente,setFromHistoTicketAttente] = useState(false);
   const [numeroTicketAttente,setNumeroTicketAttente] = useState('');

   ////////////////////////////

    const { user : {nom , nom_user } } = system;
    function handleBackButtonClick() {
        setConfirmExit(true);
        
        return true;
      }
     function goBack(isback:boolean){
        setConfirmExit(false);
        
        navigation.goBack();
     } 
    useEffect(() => {
        /*if(route.params?.fromHome){
           
            initValue();
            
        }*/
        
        
       
       if(route.params?.clientI){
        console.log('client' , route.params?.clientI);
        setClient(route.params?.clientI.nom+' '+route.params?.clientI.prenom);
       
       }
       
       
       
    },[route.params?.clientI]);
    useEffect(() => {
        if(route.params?.fromHistoAttente){
            setFromHistoTicketAttente(route.params?.fromHistoAttente);
            const ticketAttenteFromHisto = route.params?.tickets;
           
            getClientForDb(ticketAttenteFromHisto);
            reloadDataTicket(ticketAttenteFromHisto);
            
        }
    },[route.params?.fromHistoAttente]);
    useEffect(() => {
        if(route.params?.fromHome){
           
            initValue();
            
        }
    },[route.params?.fromHome]);
    useEffect(() => {
       
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);
    async function reloadDataTicket(ticket:Tickets){
        
        setNumeroTicketAttente(ticket.numero_ticket);
        setNumerorTicketGenerer(ticket.numero_ticket);
        const data = {
            query: ticket.numero_ticket,
         
            where: ['numero_ticket'],
            like: true,
            limit: 200,
        };
        const ticketsdetailAttente:Array<TicketDetails> = await getTicketsDetail(data);
      
        await getArticleFromTicketDetails(ticketsdetailAttente);
       
       
        
      
      
       

    }
    async function getClientForDb(ticket:Tickets){
        const dataclient = {
            query: ticket.id_client,
            where: ['id_client'],
            like: true,
            limit: 200,
        };
        const clientSelected:Array<ClientI> = await getClients(dataclient);
        setClient(clientSelected[0].nom+' '+clientSelected[0].prenom);
        
    }
    function getArticleFromTicketDetails(ticketsdetailAttente:Array<TicketDetails>){
        ticketsdetailAttente.forEach(async function(value) {
           
            let isExist:boolean = false;
            const dataarticle = {
                query: value.code_article,
                where: ['article_code_article'],
                like: true,
                // operator: 'OR',
                limit: 200,
            };
            if(value.statut != 0){
                const articlesFromTicketDetails:Array<ArticleI> = await getArticles(dataarticle);
                
                let articleAttenteRepris = articlesFromTicketDetails[0];
                articleAttenteRepris.qt = 1;
                articleAttenteRepris.numero_ligne = value.numero_ligne;
                articlesList.forEach(function (value) {
                    
                    if(value.article_code_article == articleAttenteRepris.article_code_article){
                        
                        value.qt = value.qt + 1;
                        
                        isExist = true;
                    }
                    
                  }); 
                  if(!isExist){
                    console.log('Code inseré');
                  
                    articlesList.push(articleAttenteRepris);
                  }
                  setArticles(articlesList);
                  countTotalQuantite();
                  nbArticle();
                     

               // articlesList.push(articleAttenteRepris);
                const id = value.id.toString();
                const dataUpdate = {
                    statut: 1,
                };
                await updateTicketsDetail(dataUpdate,id);
            }
            
           
        });
    }
    function initValue(){
        
        setArticleChoisi('');
        articlesList.length = 0;
        setArticles(articlesList);
        setClient('');
        setNbArticle(0);
        setCount(0);
        getInfoParameter();
    }
    
    async function getInfoParameter(){
    
        const { params: { numero_caisse, numero_enseigne, numero_mag} } = system;
       
        const dernierticket = numero_enseigne+numero_mag+numero_caisse;
       
        const ticket = await generateNumeroTickets(dernierticket);
        const { id_cloture } = await checkCloture();
        
        const newTicketAsauverApresValidation = {
            numero_ticket: ticket,
            statut: 0,
            user_creation: nom+' '+nom_user,
            id_client: '',
            user_annulation: '',
            motif_annulation: '',
            date_debut: toDatetime(new Date()),
            date_fin: toDatetime(new Date()),
            id_cloture: id_cloture || '',
            vendeurs: '',
            synchro_up:0,
            
        };
        
        //const ticket = await insertTickets(newTicket);
        //console.log('ticket',ticket);
        setTicketASauver(newTicketAsauverApresValidation);
        setNumerorTicketGenerer(ticket);
        props.tickets.numero_ticket = ticket;

       
       
   }

   //action quand on clique sur Remise panier
   function goToRemisePanier(){
    if(articlesList.length != 0){
        setVisibility(false);
        if(system.user.droit_remise1 || system.user.droit_remise2 || system.user.droit_remise3 ){
            navigation.navigate('ChoixMotifRemise');
        }else{
            navigation.navigate('AuthSupervisor',{id:'remise_panier',numeroTicket:numeroTickerGenerer});
        }
        
    }else{
        setModalArticleVisible(true);
    }
   
   }
 
    function countTotalQuantite(){
        let i = 0;
        let nombrearticle = 0;
        let devise = '';
        articlesList.forEach(function (value){
            devise = value.article_devise;
            nombrearticle =  value.qt * Number(value.article_pv_ttc.replace(',','.'));
        i = i + nombrearticle;
        })
        setDevise(devise);
        setCount(i);
    }
    function getNumberQuantity(){
        let i = 0;
        let nombrearticle = 0;
        articlesList.forEach(function (value){
            
            nombrearticle =  value.qt ;
            i   = i + nombrearticle;
        })
        
       return i;
    }
    function nbArticle(){
        setNbArticle(articlesList.length);
    }
   
    function goToPaiement(){
        if(client == null || client == ""){
            setModalVisible(true);
        }else{
            let numero_ligne = 0;
            /*articles.forEach(element => {

                for(let i = 1; i <= element.qt; i++){
                    numero_ligne++;
                    createTicketDetail(element,numero_ligne,1);
                }
               
            });*/

            navigation.navigate('Paiement',{articleTotal:{count,devises},clientI:route.params?.clientI,iscodechoisi:false,
            montantregle:'',item:nom+' '+nom_user, newTicketsASauver:ticketASauver});
        }
    }
    async function deleteArticle(item:ArticleI){
       let isok = false;
        articlesList.forEach(function (value) {
            console.log('Code ',value.article_code_article);
            if(value.article_code_article == item.article_code_article){
                if(value.qt >= 1){
                    value.qt = value.qt - 1;
                    isok = true;
                }
               
            }
            
          }); 
          if(isok){
            const data = {
                query: item.article_code_article,
             
                where: ['code_article'],
                like: true,
                limit: 200,
            };
            const ticketsdetailFiltered:Array<TicketDetails> = await getTicketsDetail(data);
              const id = ticketsdetailFiltered[0].id.toString();
                const dataUpdate = {
                    statut: 0,
                };
             const updateTicket = await updateTicketsDetail(dataUpdate, id);
             setArticles(() => (([...[], ...articlesList])));
             countTotalQuantite();
             nbArticle();
          }
        


         
    }
    async function incrementArticle(item:ArticleI){
       if(getNumberQuantity() <= 10){
        numligne = numligne + 1;
       createTicketDetail(item,numligne,1);
       
       articlesList.forEach(function (value) {
            
            if(value.article_code_article == item.article_code_article){
                
                value.qt = value.qt + 1;
                
            }
            
          }); 
         
          setArticles(() => (([...[], ...articlesList])));
          countTotalQuantite();
          nbArticle();
        }
    }
    async function createTicketDetail( article:ArticleI,number_line:number,status:number){
        const ticketDetail = {
            numero_ticket: numeroTickerGenerer,
            numero_ligne: number_line,
            code_article: article.article_code_article,
            statut: status,
            user_creation: nom+' '+nom_user,
            date_creation: toDatetime(new Date()),
            user_annulation: '',
            date_annulation: '',
            motif_annulation: '',
            quantite: 1,
            motif_remise: '',
            motif_retour: '',
            complement_designation: '',
            user_retour: '',
            prix_base_unitaire_ttc: 0,
            remise_totale_ttc: 0,
            tva_totale: article.article_TVA,
            prix_total_ttc: article.article_pv_ttc,
            motif_remise_complet: '',
            envoye: '',
            id_promo: '',
          }
         
          const ticketsDetails = await insertTicketDetails(ticketDetail);
          console.log('ticketsDetails',ticketsDetails);

    }
  
   async function addArticle(code:string){
        
        //let article:ArticleDto = new ArticleDto('00014','Biscuit',12,'30%',2);
        const article_query = {
             query: code,
             where: ['article_code_article'],
            // limit: 1,
          };
        const articles:Array<ArticleI> = await getArticles(article_query);
        if(articles != null ){
            let articleSingle:ArticleI;
            console.log('ticketsdetailAll');
            if(articles.length != 0){
                if(getNumberQuantity() <= 10){
                articleSingle = articles[0];
                articleSingle.qt = 1;
                
                let isExist:boolean = false;
               if(numligne == 0){
                numligne = 1;
               }else{
                numligne = numligne + 1;
               }
                
                console.log('ticketsdetailAll numligne',numligne);
                createTicketDetail(articleSingle,numligne,1);
                const data = {
                         query: numeroTickerGenerer,
                         //table: "Tickets",
                         // where: ['statut'],
                         //where: ['numero_ticket'],
                         like: true,
                         // operator: 'OR',
                         limit: 200,
                     };
                 const ticketsdetailAll:Array<TicketDetails> = await getTicketsDetail(data);
                 console.log('ticketsdetailAll',ticketsdetailAll);
                 const dataarticle = {
                    query: ticketsdetailAll[ticketsdetailAll.length - 1].code_article,
                    where: ['article_code_article'],
                    like: true,
                    // operator: 'OR',
                    limit: 200,
                };
                const articlesFromTicketDetails:Array<ArticleI> = await getArticles(dataarticle)
                let articleSelected:ArticleI = articlesFromTicketDetails[0];
                articleSelected.qt = 1;
                articleSelected.numero_ligne = ticketsdetailAll[ticketsdetailAll.length - 1].numero_ligne;
                articlesList.forEach(function (value) {
                    
                    if(value.article_code_article == articleSelected.article_code_article){
                        
                        value.qt = value.qt + 1;
                        
                        isExist = true;
                    }
                    
                  }); 
                  if(!isExist){
                    console.log('Code inseré');
                  
                    articlesList.push(articleSelected);
                  }
                 
                  setArticles(() => (([...[], ...articlesList])));
                  countTotalQuantite();
                  nbArticle();
                }
            }
        }
       

    }
    function showPopupAttente(){
        if(articlesList.length != 0){
            setModalVisibleMiseAttente(true);
        }
       
    }
    
    async function mettreEnAttente(){
        ticketASauver.date_fin = toDatetime(new Date());
        ticketASauver.statut = 0;
        const idC:any = route.params?.clientI.id_client;
        ticketASauver.id_client = idC;
        
        console.log('SAVE',ticketASauver);
        const ticket = await insertTickets(ticketASauver);
        //let numero_ligne = 0;
        /*articles.forEach(element => {

            for(let i = 1; i <= element.qt; i++){
                numero_ligne++;
                createTicketDetail(element,numero_ligne,1);
            }
           
        });*/

        initValue();

        setModalVisibleMiseAttente(false);
    }
    function showPopupAnnulerVente(){
        if(articlesList.length != 0 && ticketASauver.statut == 1){
            setModalVisibleAnnulerVente(true);
        }
    }
    function annulerVente(){
        setModalVisibleAnnulerVente(false);
        showPopupMotifAnnulation();
    }
    function showPopupMotifAnnulation(){
        setModalVisibleMotifAnnulation(true);
    }
    async function enregistrerMotifAnnulation(motif:string){
        ticketASauver.date_fin = toDatetime(new Date());
        ticketASauver.statut = 0;
        ticketASauver.motif_annulation = motif;
        const idC:any = route.params?.clientI.id_client;
        ticketASauver.id_client = idC;
        ticketASauver.user_annulation = nom+' '+nom_user,
        console.log('SAVE',ticketASauver);
        const ticket = await insertTickets(ticketASauver);
        initValue();
        setModalVisibleMotifAnnulation(false);
    }
    function goToHome(){
        handleBackButtonClick();
    }
    async function goToHisto(){
        if(articlesList.length != 0){
            ticketASauver.date_fin = toDatetime(new Date());
            ticketASauver.statut = 0;
            const idC:any = route.params?.clientI.id_client;
            ticketASauver.id_client = idC;
            const ticket = await insertTickets(ticketASauver);
        }
        
        navigation.navigate('HistoriqueTicket');
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
            
             <View style={{flex: 1,backgroundColor:'#FFFFFF'}}>
           
               <EncaissementHeader goToHome={()=> goToHome()} goToHisto={()=> goToHisto()}/>
               <View style={{marginStart:10,marginEnd:10,marginTop:20}}>
                    <View style={styles.linearheader}>
                    <View style={styles.box1}>
                        <Text style={styles.txtTitle}>Numéro de ticket</Text>

                        <Text style={styles.txtValue}>{fromHistoTicketAttente? numeroTicketAttente : numeroTickerGenerer}</Text>
                    </View>
                    <View style={styles.box2}>
                        <Text style={styles.txtTitle}>Vendeur</Text>
                        <Text style={styles.txtValue}>{nom+' '+nom_user}</Text>
                    </View>
               </View>
               
               <View style={styles.linearclientheader}>
                 <Text style={styles.txtTitle}>Client</Text>
                 <View style={styles.edtStyleCli}>
                    <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        editable = {false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        onChangeText={(value) => setClient(value)}
                        value={client}
                        placeholder=''/>
                    
                    <TouchableOpacity style={styles.button} 
                        onPress={() => { 
                            navigation.navigate('Client');
                         }}>
            
                        <Image style={styles.img} source={require("../../resources/images/account_circle.png")}/>
    
                     </TouchableOpacity>
                 </View>

               </View>
               <Text style={[styles.txtTitle,styles.margin]}>Saisie code article</Text>
               
               <View style={styles.inputcontainer}>
                        <View style={{flex:5}}>
                   
                         <TextInput
                                    style={styles.inputname}
                                    multiline={false}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    onChangeText={(value) => setArticleChoisi(value)}
                                    value={articleChoisi}
                                    placeholder=''/>
                                
                        
                       
                        </View>
                        <TouchableOpacity style={styles.buttonOK} onPress={() => addArticle(articleChoisi)} >
                        
                            <Image style={styles.img} source={require("../../resources/images/done.png")}/>
                    
                        </TouchableOpacity>
        
                </View>

               
               <View style={styles.listContainer}>
                   <View style={styles.chp1}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Désignation</Text>
                   </View>
                   <View style={styles.chp2}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Prix TTC</Text>
                   </View>
                   <View style={styles.chp3}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Remise</Text>
                   </View>
                   <View style={styles.chp4}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Quantité</Text>
                   </View>
               </View>
                </View>
               <FlatList
               
               style={{flex:1}}
                data = {articles}
                scrollEnabled = {true}
                
                ListFooterComponent={<View style={{marginStart:10,marginEnd:10,marginTop:20,marginBottom:80}}>
                    <View style={styles.result}>
                    <View style={styles.article}>
                        <TextWithResult message='Articles:' result={nbArticles.toString() }></TextWithResult>
                    </View>
                    <View style={styles.total}>
                        <TextWithResult message='Total:' result={count+ ' '+devises}></TextWithResult>
                    </View>
                    <View style={styles.remise}>
                        <TextWithResult message='Remise:' result='0'></TextWithResult>
                    </View>
                </View>
                <View style={{marginTop:10,flexDirection:'row'}}>
                    <Button message='Paiements' iscancel={false} onPress={() => goToPaiement()}></Button>
                </View>
                </View>}
                ItemSeparatorComponent={renderSeparatorView}
                renderItem={({item}) =>  
                <ItemArticle article={item} addArticle={() => incrementArticle(item)} deleteArticle={() => deleteArticle(item)} /> } />

                


           
           
            <View style={styles.bottomview}>
                    <View style={{flex:1}}>
                    
                        <Popover isVisible={visibility}  onRequestClose={() => setVisibility(false)}
                             from={(
                                <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={() => setVisibility(true)}>
                                    <Image style={styles.img} source={require("../../resources/images/g_discount.png")}/>
                                    <Text style={styles.txtstyle}>{STRING.MENU_REMISE}</Text>
                                </TouchableOpacity>
                              )}>
                               <ViewTooltip txtOne={STRING.REMISE_PROMO} txtTwo={STRING.REMISE_PANIER}txtThree={STRING.REMISE_ART}
                               isFourButton={false} txtFour="" onPressMenu1 ={() => setModalVisibleCodePromo(true)} onPressMenu2 = {() => goToRemisePanier()}/>
                        
                        </Popover>
                    </View> 
                    <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_ART_SPEC} source = {require("../../resources/images/g_stars.png")} onPress={ () => {navigation.navigate('SpecialArticle')}}/>
                    </View>  
                    <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_ATTENTE} source = {require("../../resources/images/g_hourglass.png")} onPress={ () => showPopupAttente()}/>
                    </View>  
                    <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_ANN_VENTE} source = {require("../../resources/images/g_remove_shopping_cart.png")} onPress={ () => showPopupAnnulerVente()}/>
                    </View>      
                        
            </View>
            <Popup modalVisible ={modalVisible} 
                setModalVisible ={setModalVisible} 
                cancelButton = 'Annuler'
                okButton = {STRING.OK}
                isTwoButton = {false}
                message = "Aucun client n'est associé à cette vente" >
                
            </Popup>
            <Popup message={STRING.TXT_VENTE_EN_COURS_EN_ATTENTE} isTwoButton cancelButton={STRING.Cancel} okButton={STRING.OK}
            okAction={() => mettreEnAttente()}
            modalVisible = {modalVisibleMiseAttente} setModalVisible = {setModalVisibleMiseAttente}/>
              <Popup message={STRING.TXT_ABANDON_VENTE} isTwoButton cancelButton={STRING.Cancel} okButton={STRING.OK}
            okAction={() => annulerVente()}
            modalVisible = {modalVisibleAnnulerVente} setModalVisible = {setModalVisibleAnnulerVente}/>
            
            <PopupWithTextInput message={STRING.TXT_MOTIF_tiCKET} cancelButton={STRING.Cancel} okButton={STRING.OK}
            okAction={(value) => enregistrerMotifAnnulation(value)} title="Motif" error="Vous devez ajouter un motif d'annulation"
                             modalVisible = {modalVisibleMotifAnnulation} setModalVisible = {setModalVisibleMotifAnnulation}/>
            
            <PopupWithTextInput message={STRING.TXT_SAISIE_CODE_PROMO} cancelButton={STRING.Cancel} okButton={STRING.OK}
            okAction={(value) => enregistrerCodePromo(value)} title="Code promo" error="Vous devez ajouter un code promo"
                             modalVisible = {modalVisibleCodePromo} setModalVisible = {setModalVisibleCodePromo}/>
            
            
            <Popup modalVisible ={confirmExit} 
                 setModalVisible={(btnx) => goBack(btnx)}
                cancelButton = 'Annuler'
                okButton = {STRING.OK}
                isTwoButton = {false}
                message = "Ce ticket sera perdu. Vous êtes sûr de revenir à l'acceuil" >
                
            </Popup>
            <Popup modalVisible ={modalArticleVisible} 
                setModalVisible ={setModalArticleVisible} 
                cancelButton = 'Annuler'
                okButton = {STRING.OK}
                isTwoButton = {false}
                message = "Aucun article n'est associé à cette vente" >
                
            </Popup>
            </View>
           
        )
    
}
export const Encaissement = reduxConnect(EncaissementScreen);
