/**
 * Func:Similar alipay password box
 * @author iPZero  
 * @Date: 2017/10/05
 */
import React, { PureComponent } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableHighlight,
    InteractionManager,
} from 'react-native';

class PasswordInput extends PureComponent {

    static propTypes = {
        style: View.propTypes.style,
        inputItemStyle: View.propTypes.style,
        iconStyle: View.propTypes.style,
        maxLength: TextInput.propTypes.maxLength.isRequired,
        onChange: PropTypes.func,
        onEnd: PropTypes.func,
        autoFocus: PropTypes.bool,
    };

    static defaultProps = {
        autoFocus: true,
        onChange: () => {},
        onEnd: () => {},
    };

    state = {
        text: ''
    };

    componentDidMount() {
        if (this.props.autoFocus) {
            InteractionManager.runAfterInteractions(() => {
                this._onPress();
            });
        }
    }
    _getInputItem(){
        let inputItem = [];
        let {text} = this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
              inputItem.push(
                  <View key = {i} style={[styles.inputItem, this.props.inputItemStyle]}>
                      {i < text.length ? <View style={[styles.iconStyle, this.props.iconStyle]} /> : null}
                  </View>)
            } else {
              inputItem.push(
                  <View key={i} style={[styles.inputItem,styles.inputItemBorderLeftWidth,this.props.inputItemStyle]}>
                      {i < text.length ?
                        <View style={[styles.iconStyle,this.props.iconStyle]}>
                        </View> : null}
                  </View>)
            }
        }
        return inputItem;
    }

    _onPress(){
        this.refs.textInput.focus();
    }

    render(){
        const {onChange, onEnd, style, maxLength } = this.props
        return(
          <TouchableHighlight
              onPress={this._onPress.bind(this)}
              activeOpacity={1}
              underlayColor='transparent'>
              <View style={[styles.container, style]} >
                  <TextInput
                    style={{height:45, zIndex:99, position:'absolute', width:45*6, opacity:0}}
                    ref='textInput'
                    maxLength={this.props.maxLength}
                    autoFocus={false}
                    keyboardType="number-pad"
                    onChangeText={
                      (text) => {
                        this.setState({text});
                        onChange(text);
                        if (text.length === maxLength) {
                            onEnd(text);
                        }
                      }
                    }
                  />
                {
                  this._getInputItem()
                }
              </View>
          </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    inputItem: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItemBorderLeftWidth: {
        borderLeftWidth: 1,
        borderColor: '#ccc',
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8,
    }
});
export default PasswordInput;