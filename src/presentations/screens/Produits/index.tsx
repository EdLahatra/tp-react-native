import React from 'react';
import { View, FlatList } from 'react-native';
import { Container, renderItem } from '../../components';

import ProduitsController, { reduxConnect } from '../../../controllers/Produits';

import styles from './styles';

class ProduitsScreen extends ProduitsController {
  render() {
    console.log(this.props);
    const { list } = this.props.produits;
    return (
      <Container>
      <View style={styles.listView}>
        <FlatList
          data={list || []}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </Container>
    )
  }
}

export const Produits = reduxConnect(ProduitsScreen);
