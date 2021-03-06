import React, { Component,useState } from 'react';
import { 
    View, 
    StatusBar, 
    Text,Alert,
    BackHandler, 
    ImageBackground, 
    ScrollView, 
    Dimensions,
    SafeAreaView,Image,ActivityIndicator
} from 'react-native';



import {connection} from "../networking/Server";
import { getDataFromServer } from '../networking/Server';
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';



const window = Dimensions.get('window');

export default class AgendaPage extends Component {


  // static navigationOptions = ({navigation}) => {
  //  const {state} = navigation;

 
  //   };

    constructor(){
        super()
        this.state = {
            data:[],
            loading:false,
            tracks:"",
            concat_url1:"",
        }
   }

   SendData = () =>{
       
       let Data = this.state.tracks;
         this.props.navigation.navigate('Second_Page',{dta: Data})



   }

   async setTokan(response){
     
        console.log("alert",JSON.stringify(response)) 
        try{
                // let Imgurl = response[5]["timestamp"]

                // console.log("ImgURL",response[5]["timestamp"]);

                //await AsyncStorage.multiSet([['http://mxzoom.ddns.net:3255/control/event.jpg?searchbytime_start=', Imgurl]])

                // get data from  local stroge

                // let myImge = await AsyncStorage.getItem('ImageUrl');

                // console.log("from local stroage",myImge);

                let first = 'http://mxzoom.ddns.net:3255/control/event.jpg?searchbytime_start=';
                let Second = response[2]["timestamp"];
                let concat1 = `${first}${Second}`;
         
                 await AsyncStorage.multiSet([['concat1', concat1]])
                 let myImge = await AsyncStorage.getItem('concat1');

                 console.log("from local stroage",myImge);


                this.setState({
                concat_url1 :myImge
          })

                console.log("concat url",this.state.concat_url1)


        }catch(error){
           console.log("error",error);
        }
   }

    componentDidMount = () =>{

      console.log("apple");
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // this.setState({
        //     loading:true
        //   })

          getDataFromServer('').then(response => {
            // console.log('response--->', response)

            var stringify = JSON.stringify(response)
            var parsed = JSON.parse(stringify)
// check the response is emty
            // if(stringify != ""){
            //    console.log("empety")
            // }

            console.log("rana response2",stringify)
            console.log("Parsed",parsed)
            // Alert.alert("api_asia", response);
            if (response === 404) {
    
              Alert.alert("api_asia", "Connection Error", "error");
            } else if(stringify != "") {
              // let Status = response["Error"];
              let Message = response[0]["timestamp"];
              this.setTokan(response) 
              // let All = response[""];
             console.log("Rana Response",JSON.stringify(Message));
              this.setState({
                data:response,
                tracks: Message,
                loading: true
        })

            // let Image_url = "http://mxzoom.ddns.net:3255/control/event.jpg?searchbytime_start=";
            // let timestamp = this.state.data[0]['timestamp'];

                console.log("New data" , this.state.data);
                 
                console.log("State",this.state.data[0]['timestamp']);
                console.log("State for 2nd",this.state.data[1]['timestamp']);
                console.log("State 3",this.state.data[2]['timestamp']);
                console.log("State 4",this.state.data[3]['timestamp']);
                console.log("Singale Image",this.state.tracks);
                // console.log("new concat", this.state.concat_url1);

                
      
              // this._getTablesFromApi();
            }
            else{
              console.log("all are empty")
            }
          });
      
    
    }

//     _getTracksFromApi = () => {

//       getDataFromServer('articles').then(response => {
//         console.log('response--->', response)
//         // Alert.alert("api_asia", response);
//         if (response === 404) {

//           Alert.alert("api_asia", "Connection Error", "error");
//         } else {
//           // let Status = response["Error"];
//           let Message = response["urlToImage"];
//          console.log("Rana URL",Message);
//           this.setState({
//             tracks: Message,
//           //   loading: false
//     })
//           this._getTablesFromApi();
//         }
//       });
  
// }

    // handleBackButton = () => {
    //     this.props.navigation.navigate('Home');
    //     return true;
    // } 

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {   
        return (
            <View style={{flex:1}}>
    
              <View>
              {/* <Image source={{uri: 'http://mxzoom.ddns.net:3255/control/event.jpg?searchbytime_start=${this.state.data[0]["timestamp"]}'}}    style={{width: 100, height: 100}}  /> */}
              <Image source={{uri : this.state.concat_url1}}    style={{width: 100, height: 100}}  />
             
              </View>
            {this.state.loading == false &&
            <View>
            <ActivityIndicator size="small" color="#00ff00" />
            </View>

                }
                {this.state.loading == true &&
            <View>
<Text>{this.state.concat_url1}</Text>
              <Text>123</Text>
              <TouchableOpacity onPress={ () => this.props.navigation.navigate('Second_Page') }>
                <Text>1234</Text>
              </TouchableOpacity>
              <Image source={{uri: this.state.tracks}} style={{height:50,width:50}}/>
            </View>
                }
               
                       <Swiper 
                                style={{ height: (window.height)*0.25}} 
                                loadMinimal={true}
                                showsPagination={false} 
                                loop={false} autoplay={false} 
                               /// autoplayTimeout={3}
                            >
                                {this.state.data.map((data, index) => {
                                    return(
                                        <View key={index} style={{justifyContent: 'center', alignItems: 'center',
                                }}>
                                  <Text>123</Text>
                                            
                                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Second_Page',data.thumbnailUrl) }>
                                                  <Image style={{width: (window.width)*0.95, height: (window.height)*0.25, borderRadius: 10}} source={{uri: data.thumbnailUrl}}/>
                                              <Text>Pass Data</Text>
                                            
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </Swiper>

                           

               
        

</View>
        );  
    }




}
