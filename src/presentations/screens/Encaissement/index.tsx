import React ,{ useEffect, useRef, useState }from 'react';
import { View,TouchableOpacity , Text, TextInput,Image,FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EncaissementController, { Props, reduxConnect } from '../../../controllers/Encaissement';
import { CheckCodeInput, ItemArticle } from '../../components';
import Button from '../../components/Button';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import TextWithResult from '../../components/TextWithResult';
import { Article, ArticleDto } from './Article';
import { STRING } from '../../../services/repository/database/Constants'
import {styles} from './styles';
import Popup from '../../components/Popup';

const articlesList:Array<ArticleDto> = [];
export const EncaissementScreen : React.FunctionComponent<Props> = function (props) {
    const [articles, setArticles] = useState(Array<ArticleDto>());
    const [count, setCount] = useState(0);
    const [nbArticles, setNbArticle] = useState(0);
    const [client, setClient] = useState('');
    const { navigation } = props;
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
       
        getArticles();
    },[]);



    function getArticles(){
       let article1:ArticleDto = new ArticleDto('000123','dd','120$','30%',1);
       let article2:ArticleDto = new ArticleDto('000124','Huile','130$','40%',2);
       let article3:ArticleDto = new ArticleDto('000125','Vin','130$','40%',2);
       articlesList.push(article1);
       articlesList.push(article2);
       articlesList.push(article3);
       
       //this.setState({articles:articles});
       setArticles(articlesList);
       countTotalQuantite();
       nbArticle();
    }
    function countTotalQuantite(){
        let i = 0;
        articlesList.forEach(function (value){
        i = i + value.qt;
        })
        setCount(i);
    }
    function nbArticle(){
        setNbArticle(articlesList.length);
    }
    function showPopup(){

    }
    function goToPaiement(){
        if(client == null || client == ""){
            setModalVisible(true);
        }
    }
    function addArticle(){
        
        let article:ArticleDto = new ArticleDto('00014','Biscuit','120$','30%',2);
        let isExist:boolean = false;
        
        console.log('Code size ',articlesList.length);
        articlesList.forEach(function (value) {
            console.log('Code ',value.code);
            if(value.code == article.code){
                
                value.qt = value.qt + 1;
                isExist = true;
            }
            
          }); 
          if(!isExist){
            console.log('Code inseré');
            articlesList.push(article);
          }
          //setArticles(articlesList);
          setArticles(() => ([...[], ...articlesList]));
          countTotalQuantite();
          nbArticle();
        //this.setState({
        //    articles: articles
        //});

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
            
             <View style={{flex: 1}}>
            <ScrollView 
            scrollEnabled>
            <View style={styles.container}>
               
               <View style={styles.linearheader}>
                    <View style={styles.box1}>
                        <Text style={styles.txtTitle}>Numéro de ticket</Text>

                       <Text style={styles.txtValue}>0331433311</Text>
                    </View>
                    <View style={styles.box2}>
                        <Text style={styles.txtTitle}>Vendeur</Text>
                        <Text style={styles.txtValue}>John wick</Text>
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
               <Text style={[styles.txtTitle,styles.margin]}>Saisie code article</Text>
               
               <CheckCodeInput add={() => addArticle()} ></CheckCodeInput>
               
               <View style={styles.listContainer}>
                   <View style={styles.chp1}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Désignation / Code</Text>
                   </View>
                   <View style={styles.chp2}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Prix base / Prix TTC</Text>
                   </View>
                   <View style={styles.chp3}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Remise / Motif</Text>
                   </View>
                   <View style={styles.chp4}>
                        <Text style={[styles.txtTitle,styles.headertxtColor]}>Quantité</Text>
                   </View>
               </View>
               <FlatList
               style={{flex:1}}
                data = {articles}
                scrollEnabled = {false}
                ItemSeparatorComponent={renderSeparatorView}
                renderItem={({item}) =>  
                <ItemArticle article={item}  /> } />
                <View style={styles.result}>
                    <View style={styles.article}>
                        <TextWithResult message='Articles:' result={nbArticles.toString()}></TextWithResult>
                    </View>
                    <View style={styles.total}>
                        <TextWithResult message='Total:' result={count.toString()}></TextWithResult>
                    </View>
                    <View style={styles.remise}>
                        <TextWithResult message='Remise:' result='10'></TextWithResult>
                    </View>
                </View>
                <View style={{marginTop:10,flexDirection:'row'}}>
                    <Button message='Paiements' onPress={() => goToPaiement()}></Button>
                </View>


                
            </View >
           
            </ScrollView>
           
            <View style={styles.bottomview}>
                   <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_REMISE} onPress={ () => {}}/>
                    </View> 
                    <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_REMISE} onPress={ () => {}}/>
                    </View>  
                    <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_REMISE} onPress={ () => {}}/>
                    </View>  
                    <View style={{flex:1}}>
                    <ButtonWithIcon message={STRING.MENU_REMISE} onPress={ () => {}}/>
                    </View>      
                        
            </View>
            <Popup modalVisible ={modalVisible} 
                setModalVisible ={setModalVisible} 
                cancelButton = 'Annuler'
                okButton = {STRING.OK}
                isTwoButton = {false}
                message = "Aucun client n'est associé à cette vente" >
                
            </Popup>
            </View>
           
        )
    
}
export const Encaissement = reduxConnect(EncaissementScreen);