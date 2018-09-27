/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Alert
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>HomeScreen</Text>
                <PostsList></PostsList>
            </View>
        );
    }
}

class TodoScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>TodoScreen</Text>
            </View>
        );
    }
}

class PostsList extends Component {
    state = {
        posts: [],
        selectedPost: null
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => this.setState({ posts }))
            .catch(() => Alert.alert('network error!'))
    }

    render() {
        const content = this.state.selectedPost
            ? <Post post={this.state.selectedPost} onBack={() => {this.setState({selectedPost: null})}}/>
            : <FlatList
                data={this.state.posts}
                renderItem={({ item }) =>
                    <PostListItem item={item}
                                  onPress={(item) => {this.setState({selectedPost: item})}}
                    />}
                keyExtractor={(item) => item.id.toString()}
            />;
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 33}}>Posts List</Text>
                {content}
            </View>
        );
    }
}

const PostListItem = ({ item, onPress }) => (
    <View style = {[styles.container, styles.postItem]}>
        <Text style={styles.defaultFont}>{item.title}</Text>
        <Button
            title="watch post"
            onPress={() => onPress(item)}
        />
    </View>
);

const Post = ({ post: { title, body, userId }, onBack }) => (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.id}>User id: {userId}</Text>
            </View>
            <Text style={styles.body}>{body}</Text>
            <Button
                title="BACK"
                onPress={() => onBack()}
            />
        </View>
);

const MainTabNavigation = createMaterialTopTabNavigator({
    Home: HomeScreen,
    Todos: TodoScreen,
});

export default class App extends Component<Props> {
    render() {
        return (
            <MainTabNavigation />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    body: {
        fontSize: 14,
        fontStyle: 'italic'
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5
    },
    id: {
        fontSize: 12,
        color: 'lightgrey'
    },
    header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 5
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    defaultFont: {
        fontSize: 30
    },
    postItem: {
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 30,
        paddingHorizontal: 15,
        marginHorizontal: 15
    }
});
