import {
  Box,
  Center,
  Code,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  Link,
  Text,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { RiCheckLine, RiClipboardLine } from 'react-icons/ri'
import { useParams } from 'react-router-dom'

import { availableSources } from '../home/components/availableSources'

// API prefix for all routes
const API = 'https://api.swo.moe/stats'

const BuilderItem = ({ value, description }: { value: string; description: string }) => {
  const { hasCopied, onCopy } = useClipboard(value)
  return (
    <FormControl>
      <FormLabel fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest">
        {description}
      </FormLabel>
      <Flex>
        <Input value={value} isReadOnly color={useColorModeValue('gray.500', 'whiteAlpha.500')} />
        <IconButton
          onClick={onCopy}
          ml={2}
          aria-label="Copy to clipboard"
          icon={hasCopied ? <RiCheckLine /> : <RiClipboardLine />}
        />
      </Flex>
    </FormControl>
  )
}

const Builder = () => {
  const { source } = useParams()
  const details = availableSources.find(s => s.source === source)

  const blackIconFilter = ['github', 'medium'].includes(source ?? '')
    ? useColorModeValue('grayscale(0.5)', 'grayscale(0.5) invert(1)')
    : 'grayscale(0.5)'

  const [keyInput, setKeyInput] = useState<string>('')
  const onKeyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyInput(e.target.value)

  return (
    <Flex gap={4} direction="column">
      <Box maxWidth={50} marginX="auto">
        <Image width={50} src={`/${details?.icon}`} filter={blackIconFilter} />
      </Box>
      <Center mt={4} gap={1}>
        <Code>{API}</Code>
        <Text>/</Text>
        <Code colorScheme="blue" mr={1}>
          {source}
        </Code>
        <Text>/</Text>
        <Code colorScheme="orange" mr={1}>
          {keyInput || ':key'}
        </Code>
      </Center>

      <FormControl>
        <FormLabel fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest">
          Query key
        </FormLabel>
        <InputGroup>
          <Input value={keyInput} placeholder="username, uid, key, ..." onChange={onKeyInputChange} />
        </InputGroup>
        <FormHelperText>Enter your username, uid, or other stuff for {source}.</FormHelperText>
      </FormControl>

      <Divider my={8} />

      <BuilderItem value={`${API}/${source}/${encodeURIComponent(keyInput) || '...'}`} description="API URL" />
      <BuilderItem value={`${API}/${source}/${encodeURIComponent(keyInput) || '...'}`} description="Image URL 🚧" />
      <BuilderItem value={`${API}/${source}/${encodeURIComponent(keyInput) || '...'}`} description="Markdown 🚧" />

      <Text mt={8} fontSize="sm" textColor="gray.400">
        Badges generated by{' '}
        <Link href="https://shields.io" isExternal>
          shields.io
        </Link>
        .
      </Text>
    </Flex>
  )
}

export default Builder