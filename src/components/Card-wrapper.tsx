import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

type proptype = {
    title: string
    subtitle: string
    body: string
}

const CardWrapper = (props: proptype) => {
    const {title, subtitle, body} = props
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}

export default CardWrapper
