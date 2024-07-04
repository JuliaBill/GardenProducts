import React from 'react'
import s from './TitleBreadCrumbs.module.css'
import BreadCrumbsMain from '../breadcrumbsMain/BreadCrumbsMain'

export default function TitleAndBreadCrumbs({ title, breadcrumbs, classTitleContainer }) {
  return (
    <div className={`${classTitleContainer} ${s.title_container}`}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.line}></div>
      <BreadCrumbsMain breadcrumbs={breadcrumbs} />
    </div>
  )
}
