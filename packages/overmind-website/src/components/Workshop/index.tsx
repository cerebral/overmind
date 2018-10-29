import * as React from 'react'
import {
  Wrapper,
  Container,
  Column,
  Title,
  Cell,
  List,
  ListItem,
  Link,
  Iframe,
} from './elements'

const Workshop: React.SFC = () => (
  <Wrapper>
    <Container>
      <Column>
        <Cell>
          <Title>introduction</Title>
          <Iframe
            width="400"
            height="225"
            src="https://www.youtube.com/embed/xk9uS9yc4Ns"
            frameBorder="0"
            // @ts-ignore
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Cell>
        <Cell>
          <Title>resources</Title>
          <List>
            <ListItem>
              <Link href="/guides">Overmind guides</Link>
            </ListItem>
            <ListItem>
              <Link href="https://jsonplaceholder.typicode.com/" target="_new">
                Jsonplaceholder
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://visionmedia.github.io/page.js/" target="_new">
                Page js
              </Link>
            </ListItem>
          </List>
        </Cell>
      </Column>
      <Column>
        <Cell>
          <Title>tasks</Title>
          <List>
            <ListItem>Create a simple counter application</ListItem>
            <ListItem>
              In the same app, go grab some posts from <b>Jsonplaceholder</b>{' '}
              and show 10 of them in a list
            </ListItem>
            <ListItem>
              Introduce tabs to choose either of the example apps. Hook up a
              router to the tabs, either using your favorite router or try using
              the guide
            </ListItem>
            <ListItem>
              In the list of posts, implement a click interaction on a post to
              open a modal. This interaction should not only open the modal, but
              also download information about the user from{' '}
              <b>Jsonplaceholder</b> and display it
            </ListItem>
            <ListItem>Create a route for showing the user modal</ListItem>
          </List>
        </Cell>
        <Cell>
          <Title>feedback</Title>
          Please provide your feedback by going to the following{' '}
          <Link
            href="https://spectrum.chat/?t=ddc61ecd-56c7-4c54-8029-c42118d52975"
            target="_new"
          >
            Spectrum chat
          </Link>{' '}
          thread.
        </Cell>
      </Column>
    </Container>
  </Wrapper>
)

export default Workshop
