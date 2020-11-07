import React, { useState,useEffect } from 'react';
import {Alert, Button, Text,View} from 'react-native';
import PieCharter from '../components/PieChart';
import QuizScreen from '../components/QuizScreen';

import {globalStyles} from '../globalStyle/style';

const Quiz =( {route,navigation}) => {
    //----------------------------------------Initial State--------------------------------------------------------// 
    //Bộ n câu hỏi
    const [quiz, setQuiz] = useState(route.params.quizCollections)

    // Flag start / end
    const [start, setStart] = useState(true)
    const [end, setEnd] = useState(false)
    
    // Flag chấm điểm 
    const [check,setCheck] = useState(false)
    const [checkValue, setCheckValue] = useState(false)
    
    // Điểm số và tống câu hỏi
    const [total, setTotal] = useState(quiz.length);
    const [point, setPoint] = useState(0);

    //Câu hỏi hiện tại
    const [currentQuiz, setCurrentQuiz] = useState(quiz[Math.floor(Math.random()*quiz.length)]);
    //----------------------------------------End Init State-------------------------------------------------------// 

    //----------------------------------------Initital LifeCycle---------------------------------------------------// 
    //Delay để chấm điểm 
    useEffect(() => {
        setCheck(true)
        async function delay(){
            await setTimeout(()=>{
                if(quiz.length!=0){
                    let random = Math.floor(Math.random()*quiz.length);
                    if(random == quiz.length){
                        random = Math.floor(Math.random()*quiz.length)
                    }
                    setCurrentQuiz(quiz[random]);
                    setCheck(false);
                }
                else{
                    setCheck(false);
                }
            },1000)
        }
        delay();
        if(quiz.length==0){
            setEnd(true);
        }
        return () =>{
            clearTimeout();
        }
    }, [quiz])

    //Delay 1s để chạy màn hình start
    useEffect(() => {
        // console.log(route)
        async function delay(){
            await setTimeout(()=>{
                setStart(false);
            },1000)
        }
        delay();
        return () =>{
            clearTimeout();
        }
    }, [])

    //----------------------------------------End LifeCycle------------------------------------------------------// 
    
    //---------------------------------------Execute Method------------------------------------------------------// 
    //Cộng điểm và chỉnh lại câu hỏi
    const answerQuiz = (value) =>{
        //+point
        if(value === currentQuiz.correctAnwer){
            setPoint(point+1);
            setCheckValue(true)
        }
        else{
            setCheckValue(false)
        }

        let newQuizCollection = quiz.filter(quizs => quizs.id != currentQuiz.id)
        setQuiz(newQuizCollection);
    }

    //đánh giá theo 3 thang điểm 
    const evaluate = (point,total)=>{
        if(point <= total*1/3)
            return "Bad";
        else if(point <= total*2/3)
            return "Good";
        else if(point <= total)
            return"Excellent"
        else
            return null;
    }

    //prevent back ve 
    useEffect(() =>
          navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
              'Discard changes?',
              'You have unsaved changes. Are you sure to discard them and leave the screen?',
              [
                { text: "Don't leave", style: 'cancel',      onPress: () => {} },
                { text: 'Discard',     style: 'destructive', onPress: () => navigation.push("Home")},
              ]
            );
          }),[navigation])

    //----------------------------------------Return UI----------------------------------------------------------// 

    //Màn hình trả lời
    //Lúc bắt đầu
    if(start)
        return(
            <View>
                <Text style={globalStyles.score}>Wellcome to the test</Text>
            </View>)   

    //Lúc chấm điểm
    else if(check === true)
        return(
        <View style={globalStyles.container}>
            {checkValue?
            <View>
                <Text style= {globalStyles.score}>Your answer is correct</Text>
            </View>
            :<View>
                <Text style= {globalStyles.score}>Your answer is wrong</Text>
                <Text style= {globalStyles.score}>Correctt answer is {currentQuiz.correctAnwer}</Text>
            </View>}
        </View>)

    //Xuất kết quả
    else if(end) 
    return(
        <View >
            <Text style= {globalStyles.score} >End of the test</Text>
            <Text style= {globalStyles.score} >{evaluate(point,total)?evaluate(point,total):"Test end"}</Text>
            <PieCharter total={total} point={point}/>
            <Text style= {globalStyles.score}>Score: {point}/{total}</Text>
            <Button title="Back" onPress= {()=>navigation.navigate('Home')}/>
            <Button title="Again" onPress= {()=>navigation.push('Quiz')}/>
        </View>)

    //Màn hình của QUIZ
    else if(quiz.length != 0 )
    return(
        <View style={{
            flex:1,
            marginVertical:20,
            justifyContent:"space-between",
        }}>
            <QuizScreen quiz = {currentQuiz} onAnwerQuiz={answerQuiz}/>
            <View style={{paddingTop:20}} >
                <Text style= {globalStyles.score}>Score: {point}/{total}</Text>
            </View>
        </View>)
    else

    return(
        <View/>)
}

export default Quiz;
