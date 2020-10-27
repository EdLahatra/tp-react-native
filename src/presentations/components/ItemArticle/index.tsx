import React ,{ useEffect, useRef, useState }from 'react';
import {Image,TextInput, View,Text,TouchableOpacity} from 'react-native';
import { ArticleI } from '../../../interfaces';
import { ArticleDto } from '../../screens/Encaissement/Article';
import { CircleButton } from '../CircleButton';
import {styles} from './styles';


interface Props {
    article: ArticleI,
    deleteArticle:() => void,
    addArticle:() => void,
  }
  
  
  const ItemArticle : React.FunctionComponent<Props> = function (props) {
  
  const { article,deleteArticle,addArticle } = props;
  const [qt, setQt] = useState('');

  useEffect(() => {
    setQt(article.qt.toString());
});
  return (
    
    <View style={styles.container}>
          <View style={styles.chp1}>
            <Text>{article.article_designation}</Text>
            <Text>{article.article_code_article}</Text>
          </View>
          <View style={styles.chp1}>
            <Text>{article.article_pv_ttc} {article.article_devise}</Text>
          </View>
          <View style={styles.chp1}>
            <Text>-</Text>
          </View>
          <View style={styles.chp2}>
           <TouchableOpacity onPress = {() => deleteArticle()}>
            <Image
                
                style={{height:20,width:20}}
                source={ require("../../resources/images/ic_remove_circle.png") }
                >
                
            </Image>

            </TouchableOpacity>
            <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        
                        autoCapitalize='none'
                        keyboardType='numeric'
                        onChangeText={(value) => setQt(value)}
                        value={qt}
                        placeholder=''/>
            
            <TouchableOpacity onPress = {() => addArticle()}>
            <Image
                
                style={{height:20,width:20}}
                source={ require("../../resources/images/ic_add_circle.png") }
                >
                
            </Image>

            </TouchableOpacity>
          </View>
       </View>
           
  
  );
};
export default ItemArticle;

