import { BACKGROUND_COLOR } from '../common/SousChefColors'
import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { logoutUser } from './../redux/actions/AuthenticationAction';
import { connect } from 'react-redux';

export class Login extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.userInfo()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userID == "") {
            this.props.navigation.navigate('Welcome');
        }
    }

    handleLogin = () => {
        this.props.userInfo(this.state.email, this.state.password);
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Image source={require('../assets/sousChefLogo.png')} style={[styles.logo]} resizeMode="contain" />
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: BACKGROUND_COLOR
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR,
    },
    logo: {
        height: 120,
        marginBottom: 16,
        marginTop: 64,
        padding: 10,
        width: 135,
    },
});
  
const mapStateToProps = (state) => {
    return {
        userID: state.userInfo.userID,
        errorMessage: state.userInfo.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userInfo: (email, password) => {
            dispatch(logoutUser())
        }
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Login)