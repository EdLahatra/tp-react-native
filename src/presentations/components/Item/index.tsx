import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

import { Produit } from '../../../interfaces/produits';

type IProps = {
  item: Produit
}

export function Item({ name, code }: Produit) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{code}</Text>
    </View>
  );
}

export const renderItem: React.FC<IProps> = props => {
  const { item } = props;
  return (
    <Item {...item} />
  );
}
