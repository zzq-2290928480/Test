import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {listdata: []};
  }

  componentDidMount() {
    fetch('http://www.cjlly.com:3041/record')
      .then(res => res.json())
      .then(res => {
        this.setState({
          listdata: res,
        });
      });
  }

  renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          height: 150,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#eee',
          alignItems: 'center',
        }}>
        <View>
          <Text>{index + 1}</Text>
          <Image source={{uri: item.img}} style={{height: 80, width: 80}} />
        </View>
        <Text>{item.name}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#eee',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Button
              title="删除"
              color="red"
              onPress={() => {
                var res = JSON.parse(JSON.stringify(this.state.listdata));
                for (let i = 0; i < this.state.listdata.length; i++) {
                  if (item.id === this.state.listdata[i].id) {
                    res.splice(i, 1);
                  }
                }
                this.setState({
                  listdata: res,
                });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.listdata}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={<Text>暂无推荐歌曲</Text>}
          refreshing={false}
          onEndReachedThreshold={3}
        />
      </View>
    );
  }
}
module.exports = App;
