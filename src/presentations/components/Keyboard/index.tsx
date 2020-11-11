import React from 'react';
import { Image, View, Text } from 'react-native';
import { Item, Input } from 'native-base';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  goto: (text: number) => void;
}

interface State {
  query: string;
  number: { num: string, color: string }[];
  password: string;
  issuccess: boolean;
  hidePassword: boolean
}
export class Keyboard extends React.Component<Props, State> {
  readonly state: State = {
    query: '',
    number: [],
    password: '',
    issuccess: true,
    hidePassword: true
  }
  constructor(props: Props) {
    super(props);

  }
  componentDidMount() {

    let userTestStatus: { num: string, color: string }[] = [

      { "num": "1", "color": '#3928A6' },
      { "num": "2", "color": '#3928A6' },
      { "num": "3", "color": '#3928A6' },
      { "num": "4", "color": '#3928A6' },
      { "num": "5", "color": '#3928A6' },
      { "num": "6", "color": '#3928A6' },
      { "num": "7", "color": '#3928A6' },
      { "num": "8", "color": '#3928A6' },
      { "num": "9", "color": '#3928A6' },
      { "num": "x", "color": '#EB5757' },
      { "num": "0", "color": '#3928A6' },
      { "num": "OK", "color": '#27AE60' },
    ];
    this.setState({ number: userTestStatus });

  }


  handleEmail(text: string) {

    this.setState({ password: text });

  }
  delete() {

    this.setState({
      password: ''
    });
  }

  async goToHome(pwd: number) {

    const ok = await this.props.goto(pwd);
    console.log('ok', ok);
    //check dans la base
    if (ok) {
    } else {
      this.setState({ issuccess: false });
    }
  }

  changeIcon() {
    this.setState(prevState => ({
      hidePassword: !prevState.hidePassword
    }));
  }

  render() {

    return (
      <View style={styles.parentContainer}>
        <View style={{ flexDirection: 'row', flex: 1, paddingStart: 10, paddingEnd: 10 }}>
          <Item style={styles.passwordinput}>
            <Input
              style={styles.passwordinput}
              placeholder='Entrer mot de passe'
              keyboardType='numeric'
              secureTextEntry={this.state.hidePassword}
              onChangeText={(text) => this.handleEmail(text)}
              onSubmitEditing={() => this.goToHome(this.state.password)}
              returnKeyType='go' />
            <TouchableOpacity style={styles.icon} onPress={() => this.changeIcon()}  >
              <Image style={styles.imgIcon} source={require("../../resources/images/eye.png")} />
            </TouchableOpacity>
          </Item>
          {/*<TextInput
                style={styles.passwordinput}
                multiline={false}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='numeric'
                secureTextEntry
                value={this.state.password}
                onChangeText={(text) => this.handleEmail(text)}
                onSubmitEditing={ () => this.goToHome(this.state.password)}
                returnKeyType='go'
                placeholder='Entrer mot de passe'>
                  
                </TextInput>*/}
          <TouchableOpacity style={styles.button} onPress={() => this.delete()}  >

            <Image style={styles.img} source={require("../../resources/images/clear.png")} />

          </TouchableOpacity>
        </View>

        {!this.state.issuccess && (<Text style={{ marginStart: 10, fontSize: 8, color: "#EB5757" }}>Error</Text>)}
        {/* <View style={styles.txtContainer}>
                    <FlatGrid
                itemDimension={55}
                data={this.state.number}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={7}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.itemContainer, { backgroundColor: item.color }]} onPress={() => {
                        switch(item.num){
                            case "x":
                                this.setState({password:'',issuccess:true});
                                break;
                            case "OK":
                                //send server
                                this.goToHome(this.state.password);
                                break;
                            default:
                                this.setState({password:this.state.password+''+item.num, issuccess:true});
                                break;
                        }
                        
                    }}>
                    <Text style={styles.itemName}>{item.num}</Text>
                    
                    </TouchableOpacity>
                )}
                />
                </View> */}
      </View>
    );
  }
}
