const posts = [
  {
    id: 1,
    title: 'Police use cameras and fake Amazon boxes with GPS to catch thieves',
    description:
      'Police in Jersey City have been placing fake Amazon packages outside people’s homes to catch thieves, reports the Associated Press . Using GPS trackers and doorbells cameras provided by Amazon, police are able to track and apprehend would-be thieves. The sting operation targets the most at-risk...',
  },
  {
    id: 2,
    title: 'Google relents and transfers Duck.com to DuckDuckGo',
    description:
      'DuckDuckGo, the privacy focused search engine, has acquired Duck.com from Google, reports NamePros . Responding to rumors from a few days ago , CEO Gabriel Weinberg said that the new domain would make it easier for people to...',
  },
  {
    id: 3,
    title: 'Intel unveils Foveros 3D chip stacking and new 10nm ‘chiplets’',
    description:
      'At an Architecture Day event hosted this week, Intel articulated an unusually lucid strategy for its development of future processors, most of which will revolve around fragmenting the various elements of a modern CPU into...',
  },
  {
    id: 4,
    title:
      'Epic will let other game developers use Fortnite’s cross-platform tools for free',
    description:
      'Epic Games today announced that it’s going to offer up the underlying software infrastructure and tools used to run its massive, cross-platform hit Fortnite to other game developers for free. Those tools include the ability to sync a...',
  },
  {
    id: 5,
    title:
      'Google will let Android users donate directly to nonprofits through the Play Store',
    description:
      'Google is launching a new feature for Android phones today through its Play Store app marketplace that will let anyone donate to a number of US nonprofits, with 100 percent of the donation going to the chosen organization. ',
  },
  {
    id: 6,
    title: 'FCC approves new text message rules, giving carriers more power',
    description:
      'On a party-line vote, the FCC today approved a controversial measure that gives mobile phone carriers more power over text messages. The agency’s Republican leadership has pushed for the measure, which would classify text...',
  },
  {
    id: 7,
    title: 'Amazon warehouse workers push to unionize in NYC',
    description:
      'Employees working in Amazon’s new Staten Island fulfillment center have announced their intention to unionize, reports Bloomberg . Through a partnership with the Retail, Wholesale and Department Store Union (RWDSU)...',
  },
  {
    id: 8,
    title: 'LG officially announces its ultralight 17-inch Gram laptop',
    description:
      'LG has announced new 17-inch and 14-inch laptops as the latest additions to its lightweight Gram lineup. The 17-inch was first spotted as an FCC listing and then later on Best Buy on a since-deleted page. In the past, these computers...',
  },
  {
    id: 9,
    title:
      'Small satellite launcher Rocket Lab is poised to send up its first batch of spacecraft for NASA',
    description:
      'Rocket Lab’s Electron rocket Just a month after pulling off its first commercial launch to orbit , small satellite launcher Rocket Lab is ready to put tiny probes into space again. The company’s small Electron rocket is slated to take off...',
  },
  {
    id: 10,
    title: 'Nvidia Shield TV gets Amazon Music and a $30 holiday discount',
    description:
      'Today Nvidia is releasing version 7.2 of its software for the Shield Android TV box, which continues to receive strong support more than three years on from its initial release. The update is headlined by support for Amazon Music in the...',
  },
  {
    id: 11,
    title: 'Congress thinks Google has a bias problem — does it?',
    description:
      'On Tuesday, Google CEO Sundar Pichai testified before the House Judiciary Committee, after months of escalating pressure. There were lots of issues to talk about — radicalization on YouTube, the company’s fraught relationship with...',
  },
  {
    id: 12,
    title:
      'Blizzard’s Overwatch League will have its first home games in Atlanta, Dallas, and LA next year',
    description:
      'In its first season, every match in the Overwatch League took place at Blizzard Arena in Los Angeles . But the big-picture promise for the league is that of home and away matches, where each team plays games out of arenas in their...',
  },
  {
    id: 13,
    title:
      'The AI boom is happening all over the world, and it’s accelerating quickly',
    description:
      'The rate of progress in the field of artificial intelligence is one of the most hotly contested aspects of the ongoing boom in teaching computers and robots how to see the world, make sense of it, and eventually perform complex tasks both...',
  },
  {
    id: 14,
    title:
      'Caviar’s combined iPhone XS / Apple Watch fever dream could be yours for $21,050',
    description:
      'Russian accessory maker Caviar is known for strapping impractical gold-plated objects onto the backs of iPhones, like a gold-trimmed solar charging panel. But the company may have outdone itself this year with its latest variant of...',
  },
  {
    id: 15,
    title:
      'Djay relaunched on iOS with subscription model and powerful performance features',
    description:
      'Algoriddim has announced the next generation of its DJ software for iOS called Djay . The company has made some big changes to the program, including how you pay for it. The old version cost $20 on the iPad and $10 on the...',
  },
  {
    id: 16,
    title: 'The five emoji skin tone options don’t accommodate a diverse world',
    description:
      'How do you choose which emoji skin tone to use? This week on Why’d You Push That Button , Vox ’s Kaitlyn Tiffany and I discuss the five emoji skin tones (not counting the default gold option) and how people decide which color best represents them. The tones debuted in 2015, and now, three years later...',
  },
  {
    id: 17,
    title:
      'Apple’s HomePod at $249, one of the best deals this year, is back at B&H Photo',
    description:
      'In case you missed the few opportunities around Black Friday to find the Apple HomePod for $249 — $100 off of its usual price — here’s another one . B&H Photo is offering a limited supply of the HomePod in both its black or white...',
  },
  {
    id: 18,
    title: 'Facebook building evacuated after reported bomb threat',
    description:
      'A building on Facebook’s Menlo Park campus, which houses both Instagram and Facebook employees, has been evacuated Tuesday night after a reported bomb threat. Menlo Park police confirmed on Twitter that its bomb squad was...',
  },
  {
    id: 19,
    title: 'Skullcandy launches its first truly wireless earbuds',
    description:
      'Skullcandy announced the launch of its first truly wireless earbuds today, called the Skullcandy Push. The earbuds feature a large button on the side, which can be used to answer calls, switch audio tracks, and control the volume, in...',
  },
  {
    id: 20,
    title:
      'Huawei’s CFO is granted bail by Canadian court but will be closely monitored',
    description:
      'Meng Wanzhou, one of Huawei’s top executives and the eldest daughter of the company’s founder/CEO, will be released on bail and kept under tight monitoring over bank fraud allegations, a Canadian court ruled today. The Star...',
  },
]

module.exports = {
  posts(req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')

    let returnPosts = posts

    if (req.query.query) {
      returnPosts = returnPosts.filter((post) => {
        return (
          post.title.toLowerCase().indexOf(req.query.query) >= 0 ||
          post.description.toLowerCase().indexOf(req.query.query) >= 0
        )
      })
    }

    if (req.query.limit && !isNaN(Number(req.query.limit))) {
      returnPosts = returnPosts.slice(0, Number(req.query.limit))
    }

    res.send(returnPosts)
  },
}
