import React, { Component } from 'react'
import { Text, View, FlatList, Button, Image, Modal, TouchableHighlight } from 'react-native'

class C0513_2 extends Component {


    constructor(props) {
        super(props)
        this.max = 7
        this.state = { data: [], modalVisible: false, showInfo: {} }
    }
    _delete = (id) => {
        let { data } = this.state
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data.splice(i, 1)
            }
        }
        this.setState({
            data
        })
    }

    componentDidMount() {
        // alert('执行')
        fetch('http://www.cjlly.com:3041/record').then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson))
                this.setState({
                    data: responseJson
                })
            })
    }

    // _add = (item) => {
    //     alert('添加'+item+'成功！')
    // }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableHighlight activeOpacity={2} onPress={() => {
                this.setState({
                    modalVisible: true,
                    showInfo: item
                })
            }}>
                <View style={{ height: 140, flexDirection: 'row', justifyContent: "space-between" }} key={item.id}>
                    <View>
                        <Text>{index}</Text>
                        <Image source={{ uri: item.img }} style={{ height: 80, width: 80 }} />
                    </View>
                    <Text>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                       
                        <Button style={{ width: 50 }} onPress={() => this._delete(item.id)} title="删除" />
                    </View>

                </View>
            </TouchableHighlight>
        )
    }
    _ItemSeparatorComponent = () => {
        return <View style={{ height: 1, backgroundColor: 'red' }}></View>
    }
    _refresh = () => {
        // let temp = Math.floor(Math.random() * 100 + 100)
        // let data = this.state.data.splice(0)
        // data.unshift(temp)
        // this.setState({ data: data })
    }
    _endReached = () => {
        // let data = this.state.data.splice(0)
        // data.push(++this.max)
        // this.setState({ data })
    }
    render() {
        let { showInfo } = this.state
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={({ item, index }) => index}
                    ListEmptyComponent={<Text>你的订单不存在</Text>}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    refreshing={false}
                    onRefresh={this._refresh}
                    onEndReachedThreshold={3}
                    onEndReached={this._endReached}
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}
                >
                    <View style={{ marginTop: 22, display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: showInfo.img }} style={{ height: 80, width: 80 }} />
                        <Text>歌曲：{showInfo.name}</Text>
                        <Text>歌手名：{
                            showInfo.singer && showInfo.singer.map((item, index) => {
                                return item + ','
                            })
                        }</Text>
                    </View>
                </Modal>
            </View>
        )
    }
}
module.exports = C0513_2;