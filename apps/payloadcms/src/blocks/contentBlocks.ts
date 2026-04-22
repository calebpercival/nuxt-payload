//content component blocks
import { ContentWithMedia } from '@/blocks/content/contentWithMedia'
import { Hero } from '@/blocks/content/hero'
import { RichText } from '@/blocks/content/richText'
import { Button } from '@/blocks/content/button'
import { LatestPosts } from '@/blocks/content/latestPosts'
import { Image } from '@/blocks/content/image'
import { VideoEmbed } from '@/blocks/content/videoEmbed'
import { Anchor } from '@/blocks/content/anchor'
import { ContactForm } from '@/blocks/content/contactForm'

export const contentBlocks = [
  ContentWithMedia,
  Hero,
  RichText,
  Button,
  LatestPosts,
  Image,
  VideoEmbed,
  Anchor,
  ContactForm,
]

export const lexicalContentBlocks = [Button, Image, VideoEmbed]
