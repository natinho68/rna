import React from 'react'
import { Card, Paragraph, Title } from 'react-native-paper'

interface CardItemProps {
  title: string
  data: string | number
}

export const CardItem: React.FC<CardItemProps> = ({ data, title }): JSX.Element => {
  return (
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{data}</Paragraph>
      </Card.Content>
    </Card>
  )
}
export default Card
