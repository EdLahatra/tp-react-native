import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export class HeaderListTicket extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <View style={styles.chp1}>
            <Text style={[styles.txtTitle, styles.headertxtColor]}>Date ticket</Text>
          </View>
          <View style={styles.chp2}>
            <Text style={[styles.txtTitle, styles.headertxtColor]}>Numéro ticket</Text>
          </View>
          <View style={styles.chp2}>
            <Text style={[styles.txtTitle, styles.headertxtColor]}>Utilisateur</Text>
          </View>
          <View style={styles.chp2}>
            <Text style={[styles.txtTitle, styles.headertxtColor]}>Montant</Text>
          </View>
          <View style={styles.chp2}>
          </View>
        </View>
        <View style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CEDCCE",
        }} />
      </View>

    );
  }
}
