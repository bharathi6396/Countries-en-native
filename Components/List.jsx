import React, { Component } from 'react';
import { View, FlatList, Text, Image,StyleSheet } from 'react-native';

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
      <View style={[styles.container, {
        flexDirection: "column"
      }]}>
        <Text style={{  width: 300, flex: 1, backgroundColor: "darkorange" }}> country:{item.name}</Text>
        <Text style={{  width: 300, flex: 1, backgroundColor: "darkorange" }}>capital:{item.capital}</Text>
        <Image
                    source={{ uri: ` ${ item.flag }` }}
                    style={{ width: 300, height: 300 }} />
          
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})

