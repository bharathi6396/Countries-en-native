import React, { Component } from 'react';
import { View, FlatList, Text, Image } from 'react-native';

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }
  componentDidMount() {
    this.getCountry()
  }
  getCountry = async () => {
    try {
      const result = await fetch(`http://restcountries.eu/rest/v2/all`)
      const countries = await result.json()
      this.setState({ countries })
    } catch (error) {
      console.error(error)
    }
  }
  renderItem({ item }) {
    console.log(item)
    return (
      <View>
        <Text>country:{item.name}</Text>
        <Text>capital:{item.capital}</Text>
        <Image
                    source={{ uri: ` ${ item.flag }` }}
                    style={{ width: 100, height: 100 }} />
          
      </View>
    );
  }
  render() {
    return (
      <FlatList
        data={this.state.countries}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

