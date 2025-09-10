'use client'
import React, {ForwardRefExoticComponent, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from 'antd';

interface IQuestionList {
  id: number,
  title: string,
  isShow: boolean,
  deleteItem?:(id:number)=>void
  editItem?:(id:number)=>void
}



function Item(props: IQuestionList): React.JSX.Element {
  const {id, title, isShow,deleteItem,editItem}:IQuestionList = props

  function edit(item: IQuestionList): void {
    console.log(id,item)
    editItem&&editItem(id)
  }
function del(id:number){
  console.log(deleteItem)

  deleteItem &&deleteItem(id)
}

  return (
    <div>
      <span>
        {title}
      </span>
      &nbsp;
      {isShow ?
        <span className='text-green-500'>已发布</span> :
        <span>未发布</span>}
      &nbsp;
      <Button onClick={() => {
        edit(props)
      }}>编辑问卷</Button>
      &nbsp;
      <Button onClick={() => {
        del(id)
      }}>删除问卷</Button>
    </div>
  )

}

export default function QuestionList(): React.JSX.Element {
  const [questionList,setNewItem]=useState([
    {id:1,title:'aaa',isShow:false},
    {id:2,title:'bbb',isShow:false},
    {id:3,title:'ccc',isShow:false},
    {id:4,title:'12dddd3',isShow:false},
  ])

  function add() {
    setNewItem(
      questionList.concat(
        {id:questionList.length+1,title:`abc+${questionList.length+1}`,isShow:true}
      ))
  }

  function deleteItem(id:number):void {
    setNewItem(
      questionList.filter((q:IQuestionList):boolean=> q.id !== id)

    )
  }
  function editItem(id:number):void {
    setNewItem(
      questionList.map((q:IQuestionList):IQuestionList=> {
        if(q.id!==id) return q
        else return {...q,isShow:!q.isShow}
      })

    )
  }
  return (
    <>
      <h1 style={{fontSize:'32px'}}>问卷列表</h1>
      <div>{
        questionList.map((item: IQuestionList) => {
          return <Item
            key={item.id}
            id={item.id}
            isShow={item.isShow}
            deleteItem={deleteItem}
            editItem={editItem}
            title={item.title}/>
        })
      }</div>
      <Button onClick={add}>新增</Button>
    </>

  )
}
