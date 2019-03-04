import React from "react";
import {Text, View, Button, TextInput, StyleSheet} from "react-native";

class SetString extends React.Component {
    state = {stackId: null, text: ""};

    submit = () => {
        this.setValue(this.state.text);
    };

    setValue = value => {
        const {drizzle, drizzleState} = this.props;
        const contract = drizzle.contracts.MyStringStore;
        const stackId = contract.methods["set"].cacheSend(value, {
            from: drizzleState.accounts[0]
        });
        this.setState({stackId});
    }

    getTxStatus = () => {
        const {transactions, transactionStack} = this.props.drizzleState;
        const txHash = transactionStack[this.state.stackId];

        if (!txHash) return null;

        if (transactions[txHash] && transactions[txHash].status)
            return `Transaction status: ${transactions[txHash].status}`;

        return null;
    };

    render() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({text})}
                    value={this.state.text}
                    placeholder="Enter some text"
                />
                <Button title="Submit" onPress={this.submit}/>
                <Text>{this.getTxStatus()}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    }
});

export default SetString;
