import { ChristmasLetter } from '../types';

export const INITIAL_LETTERS: ChristmasLetter[] = [
  {
    id: 'letter-2025',
    year: 2025,
    title: 'The Year of Pine Cones & Big Leaps',
    subtitle: 'From mountain trails to new classrooms & an overly ambitious gingerbread village',
    dateSent: 'December 20, 2025',
    senders: 'The Montgomery Family (David, Sarah, Liam, Maya & Barnaby the Golden)',
    location: 'Evergreen Pines, Vermont',
    coverImage: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80',
    stampText: 'AIR MAIL • VERMONT POST 2025',
    salutation: 'Dearest Friends and Family,',
    paragraphs: [
      'Greetings from the snowy hollows of Vermont! As the kettle whistles on the stove and Barnaby lies contentedly across two pairs of cold feet, we are sitting down with warm mugs of spiced cider to reflect on a bustling, joyful, and occasionally chaotic 2025.',
      'This was undeniably the year of "firsts." Liam entered high school this autumn, suddenly towering over Sarah by two full inches and developing a passionate enthusiasm for cross-country running and vintage vinyl records. Meanwhile, Maya (now 10) starred as the fearless Sugar Plum Fairy in the community Nutcracker and has officially declared her bedroom an "avalanche of art supplies and glitter."',
      'David celebrated ten years running his heirloom woodwork studio, restoring a 19th-century church bell tower and building the long-promised dining room table that miraculously fit all 14 cousins during Thanksgiving. Sarah published her first regional hiking guide, "Wildflower Ridges of New England," after dragging the entire family through 48 mountain peaks (with varying degrees of teen enthusiasm, sweetened by cider donuts).',
      'Barnaby turned four and remains the neighborhood\'s self-appointed chief squirrel investigator. His holiday highlight was successfully retrieving a three-foot pine bough from the woods and attempting to wedge it through the doggy door.',
      'We hope this holiday season brings you quiet moments by the hearth, deep belly laughs with those you hold dear, and an abundance of sweet treats. Our front porch light is always on if your travels bring you north!'
    ],
    milestones: [
      { icon: 'GraduationCap', label: 'Liam to High School', text: 'Started 9th grade & ran his first varsity 5K in 19:42' },
      { icon: 'BookOpen', label: 'Book Published', text: "Sarah's New England hiking guidebook hit local bookshelves!" },
      { icon: 'Sparkles', label: 'Nutcracker Debut', text: 'Maya danced as Sugar Plum Fairy across 6 sold-out shows' },
      { icon: 'Hammer', label: 'Heirloom Table', text: 'David completed a 12-seater hand-hewn oak harvest table' },
      { icon: 'Dog', label: 'Barnaby’s Score', text: 'Captured zero squirrels, but won Best Festive Sweater in town' }
    ],
    enclosedPhotos: [
      {
        id: 'photo-2025-1',
        url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
        caption: 'The annual tree hunt in the Green Mountains (we picked the tallest one)',
        location: 'Stowe, VT',
        year: 2025
      },
      {
        id: 'photo-2025-2',
        url: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80',
        caption: 'Maya in costume backstage before opening night',
        location: 'Town Hall Theater',
        year: 2025
      },
      {
        id: 'photo-2025-3',
        url: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=800&q=80',
        caption: 'Barnaby inspecting David\'s wood shavings like a proper supervisor',
        location: 'The Workshop',
        year: 2025
      }
    ],
    recipeCard: {
      title: 'Grandma Clara’s Cardamom Orange Shortbread',
      servings: '24 cookies',
      prepTime: '25 mins + 1 hr chill',
      description: 'The buttery, melt-in-your-mouth shortbread that filled our kitchen all December.',
      ingredients: [
        '1 cup (2 sticks) unsalted butter, softened',
        '½ cup confectioners’ sugar',
        '2 cups all-purpose flour',
        '1 tsp freshly ground cardamom',
        'Zest of 2 fresh naval oranges',
        'Coarse demerara sugar for sparkling edges'
      ],
      instructions: [
        'Beat butter and powdered sugar until light, creamy and pale.',
        'Fold in orange zest, ground cardamom, and flour until soft dough forms.',
        'Roll into logs, coat in demerara sugar, chill for 1 hour, then slice into ½-inch rounds.',
        'Bake at 350°F (175°C) for 14-16 minutes until edges are pale golden.'
      ],
      familyNote: 'Sarah’s secret: Roll the warm logs in sugar twice for maximum festive sparkle!'
    },
    signOff: 'With all our warmest love, cheer, and holiday hugs,',
    signatures: ['David', 'Sarah', 'Liam', 'Maya', '🐾 Barnaby'],
    tags: ['Milestones', 'Hiking & Travel', 'Pets', 'Recipes', 'Traditions'],
    favorite: true,
    themeColor: 'crimson'
  },
  {
    id: 'letter-2024',
    year: 2024,
    title: 'The Great Roadtrip & Midnight Snow',
    subtitle: '18 national parks, a camper van named Clementine, and a blizzard in July',
    dateSent: 'December 18, 2024',
    senders: 'The Montgomery Family',
    location: 'Evergreen Pines, Vermont',
    coverImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=1200&q=80',
    stampText: 'ROUTE 66 & MOUNTAIN PEAKS • 2024',
    salutation: 'Dear cherished friends,',
    paragraphs: [
      'Looking out our frosted window as the first heavy snowfall blankets the pine grove, we are reminded of how fast 365 days can fly. If 2024 had a headline for our crew, it would be: "Pack light, bring extra socks, and never trust a shortcut in Montana."',
      'For two unforgettable months this summer, we loaded up "Clementine"—a retrofitted 2012 camper van—and hit the open road. We marveled at the sapphire depths of Crater Lake, watched bison amble across Yellowstone mist at sunrise, and stargazed in Utah’s Dark Sky reserves until Liam spotted three shooting stars.',
      'Back home, Liam took up the cello (to the mild bewilderment of Barnaby, who howls along on low C), and Maya mastered the bicycle without training wheels on her 9th birthday. Sarah launched the town’s first community garden seed library, distributing over 400 heirloom tomato and sweet pea seed packets to neighbors.',
      'David survived coaching Maya\'s spring soccer team, the "Lightning Fireflies," whose team strategy consisted mostly of cartwheels on the goalie line and post-game orange wedges.',
      'As we light our holiday candles and gather near the hearth, we count our friendships as our greatest treasure. May your holidays be bright, cozy, and wrapped in peace.'
    ],
    milestones: [
      { icon: 'Compass', label: 'Cross-Country Trek', text: '7,400 miles traveled across 18 State & National Parks' },
      { icon: 'Music', label: 'Liam’s Cello', text: 'Learned Bach Suite No. 1 and performed in the school ensemble' },
      { icon: 'Bike', label: 'No Training Wheels!', text: 'Maya conquered the big hill behind the middle school' },
      { icon: 'Sprout', label: 'Seed Library', text: 'Sarah distributed 420 heirloom seed packets locally' }
    ],
    enclosedPhotos: [
      {
        id: 'photo-2024-1',
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
        caption: 'Clementine the camper van parked beneath the red rocks in Moab',
        location: 'Moab, Utah',
        year: 2024
      },
      {
        id: 'photo-2024-2',
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
        caption: 'Hot cocoa toast at sunrise by Lake McDonald',
        location: 'Glacier National Park',
        year: 2024
      }
    ],
    recipeCard: {
      title: 'Clementine Campfire Spiced Wassail',
      servings: '8 mugs',
      prepTime: '15 mins',
      description: 'The steaming, fragrant apple cider brew that kept us warm under chilly autumn stars.',
      ingredients: [
        '½ gallon fresh pressed apple cider',
        '2 cups cranberry pomegranate juice',
        '3 cinnamon sticks & 6 whole cloves',
        '1 star anise & 1 inch sliced fresh ginger',
        'Orange slices studded with cloves'
      ],
      instructions: [
        'Combine all juices and whole spices in a heavy pot or slow cooker.',
        'Simmer gently on low heat for 45 minutes without boiling.',
        'Ladle into tin mugs with a cinnamon stick stirrer.'
      ],
      familyNote: 'Grown-ups can add a splash of dark spiced rum or bourbon!'
    },
    signOff: 'Sending peace, love, and cheerful tidings,',
    signatures: ['David', 'Sarah', 'Liam', 'Maya', '🐾 Barnaby'],
    tags: ['Hiking & Travel', 'Milestones', 'Humor', 'Recipes'],
    favorite: true,
    themeColor: 'forest'
  },
  {
    id: 'letter-2023',
    year: 2023,
    title: 'The Kitchen Remodel & The Treehouse Chronicles',
    subtitle: 'Living without a stove for 4 months, a backyard fortress, and the arrival of Barnaby',
    dateSent: 'December 22, 2023',
    senders: 'The Montgomery Family',
    location: 'Evergreen Pines, Vermont',
    coverImage: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=1200&q=80',
    stampText: 'HOME SWEET HOME • DEC 2023',
    salutation: 'Warmest Holiday Greetings to All!',
    paragraphs: [
      'If you have ever attempted to cook Thanksgiving dinner for twelve people using only an electric skillet and an air fryer in the garage, then you already know the spirit of our 2023!',
      'In January we embarked on what was supposed to be a "quick three-week" farmhouse kitchen renovation. Four months later, our drywall was finally hung, our subway tiles were aligned, and David had built custom cedar open shelving that Sarah had pinned on Pinterest four hundred times. The result is pure heaven—especially now that we can bake holiday cookies without tripping over electrical cords.',
      'In April, our family grew by four paws with the arrival of Barnaby, an exuberant golden retriever puppy with ears too big for his head and a distinct love for wool socks.',
      'Over the summer, David and Liam spent weekends perched in the twin sugar maples constructing the "Eagle\'s Nest" treehouse—complete with a pulley bucket system, rope ladder, and solar fairy lights where the kids hosted countless flashlight book club meetings.',
      'We are so grateful for good health, loyal friends, and the simple magic of a warm house on a cold winter night.'
    ],
    milestones: [
      { icon: 'Dog', label: 'Welcome Barnaby!', text: 'Brought home our 8-week golden retriever puppy' },
      { icon: 'Home', label: 'Kitchen Completed', text: 'Survived 112 days of toaster-oven cuisine' },
      { icon: 'Trees', label: 'Treehouse Built', text: '14 feet high in the maples with rope ladder & solar lanterns' },
      { icon: 'Award', label: 'Spelling Bee Champ', text: 'Liam won 2nd place in the county spelling bee ("Bivouac")' }
    ],
    enclosedPhotos: [
      {
        id: 'photo-2023-1',
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
        caption: '8-week-old Barnaby completely asleep in Liam\'s winter beanie',
        location: 'Living Room Hearth',
        year: 2023
      },
      {
        id: 'photo-2023-2',
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
        caption: 'First sunset from the newly finished Eagle\'s Nest treehouse',
        location: 'Backyard Maple Grove',
        year: 2023
      }
    ],
    recipeCard: {
      title: 'Garage-Air-Fryer Holiday Glazed Pecans',
      servings: '6 snack bowls',
      prepTime: '10 mins',
      description: 'The crispy, cinnamon-sugared pecans that saved our sanity during the renovation.',
      ingredients: [
        '1 lb raw pecan halves',
        '1 egg white beaten frothy with 1 tbsp water',
        '½ cup brown sugar & ¼ cup white sugar',
        '1 tbsp ground cinnamon & ½ tsp sea salt',
        '¼ tsp nutmeg and a pinch of cayenne'
      ],
      instructions: [
        'Toss pecans in frothy egg white until evenly coated.',
        'Mix dry spices and sugars, then toss thoroughly with pecans.',
        'Spread on baking tray and bake at 300°F (150°C) for 30 minutes, stirring at 15 mins.',
        'Let cool completely until ultra-crisp.'
      ],
      familyNote: 'Wrap in cellophane bags with red velvet ribbon for instant host gifts!'
    },
    signOff: 'May your days be merry and bright,',
    signatures: ['David', 'Sarah', 'Liam', 'Maya', '🐾 Puppy Barnaby'],
    tags: ['Pets', 'New Home', 'Milestones', 'Humor', 'Traditions'],
    favorite: false,
    themeColor: 'gold'
  },
  {
    id: 'letter-2022',
    year: 2022,
    title: 'Stories from the Fjords & Fireflies',
    subtitle: 'Visiting ancestral villages in Norway, science fairs, and pottery experiments',
    dateSent: 'December 21, 2022',
    senders: 'The Montgomery Family',
    location: 'Evergreen Pines, Vermont',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    stampText: 'NORGE & NORTHEAST • 2022',
    salutation: 'Dear Family & Dear Friends,',
    paragraphs: [
      'Merry Christmas and God Jul from our family to yours! As the snow blankets our garden beds, we find ourselves flipping through photo albums of what turned out to be our most adventurous travel year yet.',
      'In July, we finally took our postponed dream trip to Norway to visit the ancestral fishing village where Sarah’s great-grandparents lived in the 1900s. We sailed through the mist-shrouded Geirangerfjord, ate waffles shaped like hearts with brown goat cheese (brunost), and watched the kids jump into glacier-fed waters that were roughly three degrees above freezing!',
      'Back home in autumn, Maya started 2nd grade and entered her volcano phase—producing three distinct papier-mâché eruptions in the kitchen that required vinegar cleanup crews. Liam played shortstop for his Little League team and hit his first out-of-the-park home run right into Mr. Henderson\'s prize tomato patch (apology pie delivered immediately).',
      'David joined the volunteer fire department as an auxiliary driver, and Sarah began teaching Saturday nature journaling workshops at the local library.',
      'Wishing you and those you cherish good health, peace of heart, and the warmth of lasting memories this holiday season.'
    ],
    milestones: [
      { icon: 'Globe', label: 'Norway Voyage', text: 'Explored Bergen, Geirangerfjord & great-grandparents’ homestead' },
      { icon: 'Trophy', label: 'First Home Run', text: 'Liam hit a grand slam into the outfield tomatoes' },
      { icon: 'Palette', label: 'Nature Journaling', text: 'Sarah taught 18 sold-out botanical illustration workshops' },
      { icon: 'Shield', label: 'Volunteer Service', text: 'David completed local community emergency training' }
    ],
    enclosedPhotos: [
      {
        id: 'photo-2022-1',
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
        caption: 'The midnight sun shining over the western fjords of Norway',
        location: 'Geirangerfjord, Norway',
        year: 2022
      },
      {
        id: 'photo-2022-2',
        url: 'https://images.unsplash.com/photo-1512474932049-78ac69eed10c?auto=format&fit=crop&w=800&q=80',
        caption: 'Liam holding his game ball with tomato stains on his cleats',
        location: 'Little League Diamond',
        year: 2022
      }
    ],
    recipeCard: {
      title: 'Nordic Holiday Cardamom Kringler',
      servings: '1 large festive wreath',
      prepTime: '40 mins + proofing',
      description: 'A braided golden holiday yeast pastry filled with almond butter paste and pearl sugar.',
      ingredients: [
        '3 cups all-purpose flour',
        '1 packet active dry yeast in ¾ cup warm milk',
        '¼ cup sugar & 1 tsp crushed cardamom',
        'Filling: 6 tbsp butter, ½ cup brown sugar, 1 tsp cinnamon, ¼ cup almond meal',
        'Swedish pearl sugar for topping'
      ],
      instructions: [
        'Knead enriched dough and let rise until doubled in bulk (1 hour).',
        'Roll into large rectangle, spread spiced almond butter filling, roll into log and slice down middle to braid.',
        'Form into a wreath circle, brush with egg wash, sprinkle pearl sugar.',
        'Bake at 375°F (190°C) for 22 minutes until deeply golden.'
      ],
      familyNote: 'Best enjoyed warm straight from the oven with strong dark roast coffee.'
    },
    signOff: 'With warmest holiday wishes and deep gratitude,',
    signatures: ['David', 'Sarah', 'Liam', 'Maya'],
    tags: ['Hiking & Travel', 'Milestones', 'Traditions', 'Recipes'],
    favorite: false,
    themeColor: 'navy'
  },
  {
    id: 'letter-2021',
    year: 2021,
    title: 'The Backyard Ice Rink & Puzzles Galore',
    subtitle: 'Skating under string lights, garden triumphs, and 1,000-piece jigsaws',
    dateSent: 'December 20, 2021',
    senders: 'The Montgomery Family',
    location: 'Evergreen Pines, Vermont',
    coverImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    stampText: 'WINTER WONDERLAND • 2021',
    salutation: 'Dearest Friends Far and Wide,',
    paragraphs: [
      'As we wrap another year in ribbon and holly, we are sending our fondest greetings to you from our cozy corner of Vermont.',
      'The undisputed champion project of winter 2021 was David’s backyard ice rink. Armed with 2x4s, a giant white tarp, and endless late-night floodings at 10°F, he transformed our sloping backyard into the "Montgomery Garden Arena." We spent nearly every evening skating under strings of warm café lights, drinking thermos cocoa, and practicing wobbly figure eights.',
      'Maya turned six and lost her two front teeth in the same week (which made singing "All I Want for Christmas Is My Two Front Teeth" an instant viral sensation in the family group chat). Liam dove headfirst into robotics and Lego mechanics, constructing a machine that attempts to dispense dog treats on a timer.',
      'Sarah\'s summer garden yielded an astonishing 84 jars of strawberry rhubarb jam, which we have happily packaged as our holiday gifts to our neighbors this year.',
      'May the peace of the season stay with you throughout the coming year.'
    ],
    milestones: [
      { icon: 'Snowflake', label: 'Backyard Ice Rink', text: 'Built a 40x20ft skating rink with night floodlights' },
      { icon: 'Smile', label: 'Two Front Teeth Lost', text: 'Maya perfected her holiday whistling smile' },
      { icon: 'Cpu', label: 'Lego Treat Dispenser', text: 'Liam coded a functioning motor-powered snack dispenser' },
      { icon: 'Gift', label: '84 Jam Jars', text: 'Canned record harvest of home-grown strawberry rhubarb' }
    ],
    enclosedPhotos: [
      {
        id: 'photo-2021-1',
        url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=800&q=80',
        caption: 'Night skating on the backyard rink with fire pit glowing in the snow',
        location: 'Backyard Rink',
        year: 2021
      }
    ],
    recipeCard: {
      title: 'Spiced Strawberry Rhubarb Holiday Jam',
      servings: '6 half-pint jars',
      prepTime: '45 mins canning',
      description: 'Sweet, tart, with a hint of warm winter cinnamon and vanilla bean.',
      ingredients: [
        '4 cups chopped fresh rhubarb',
        '4 cups crushed ripe strawberries',
        '5 cups sugar',
        '1 packet fruit pectin',
        '1 whole vanilla bean split & ½ tsp ground cinnamon'
      ],
      instructions: [
        'Combine fruit, vanilla bean, cinnamon, and pectin in large preserving pan.',
        'Bring to rolling boil, add sugar all at once, stirring constantly.',
        'Boil hard for 1 full minute, skim foam, ladle into hot sterile jars and process 10 mins.'
      ],
      familyNote: 'Heavenly on warm buttermilk biscuits Christmas morning!'
    },
    signOff: 'With love, joy, and peace on earth,',
    signatures: ['David', 'Sarah', 'Liam', 'Maya'],
    tags: ['Traditions', 'Milestones', 'Humor', 'Recipes'],
    favorite: true,
    themeColor: 'crimson'
  },
  {
    id: 'letter-2020',
    year: 2020,
    title: 'The Great Indoors & Sourdough Adventures',
    subtitle: 'Living room campouts, porch concerts, and finding gratitude in small things',
    dateSent: 'December 23, 2020',
    senders: 'The Montgomery Family',
    location: 'Evergreen Pines, Vermont',
    coverImage: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80',
    stampText: 'TOGETHER AT HOME • 2020',
    salutation: 'Dear Loved Ones,',
    paragraphs: [
      'What a year it has been. While 2020 certainly did not go according to anyone\'s planner, being tucked into our home together taught us so much about resilience, creativity, and the power of handwritten letters.',
      'We became master living room fort architects—engineering a two-room blanket palace held together by heavy textbooks and binder clips that remained standing for three solid weeks. We held weekly porch concerts for our neighbors, baking bread on Thursdays and trading sourdough loaves for garden zucchini over fence posts.',
      'Liam learned how to play chess on an old wooden board and by November was routinely beating both of his parents in under twenty moves. Maya learned how to knit finger scarves, resulting in every stuffed animal in the house receiving a custom 6-foot muffler.',
      'This year reminded us that the heart of Christmas isn’t about grand plans, but about being present with one another and holding those we love in our thoughts.',
      'Sending you a mountain of love and the warmest hopes for a bright new year.'
    ],
    milestones: [
      { icon: 'Tent', label: 'Fort Architecture', text: 'Built a multi-room blanket castle spanning the entire living room' },
      { icon: 'Crown', label: 'Chess Grandmaster', text: 'Liam mastered the Sicilian Defense against Dad' },
      { icon: 'Heart', label: 'Porch Deliveries', text: 'Delivered 30+ sourdough loaves to elderly neighbors' }
    ],
    enclosedPhotos: [
      {
        id: 'photo-2020-1',
        url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
        caption: 'Inside the blanket fortress with fairy lights and cocoa mugs',
        location: 'Living Room Fort',
        year: 2020
      }
    ],
    signOff: 'With endless love and hope for 2021,',
    signatures: ['David', 'Sarah', 'Liam', 'Maya'],
    tags: ['Traditions', 'Humor', 'Milestones'],
    favorite: false,
    themeColor: 'emerald'
  },
  {
    id: 'letter-2018',
    year: 2018,
    title: 'The Year We Moved to the Pines',
    subtitle: 'Unpacking boxes in snow boots, our first Vermont winter, and baby steps',
    dateSent: 'December 24, 2018',
    senders: 'David, Sarah, Liam & Maya',
    location: 'Evergreen Pines, Vermont',
    coverImage: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=1200&q=80',
    stampText: 'NEW CHAPTER • VT 2018',
    salutation: 'Dearest Friends and Family,',
    paragraphs: [
      'We are writing to you by the crackle of a wood stove in our new old farmhouse in Vermont! If someone had told us last Christmas that we would pack up our city lives and buy an 1880s colonial with three acres of apple trees, we might have laughed—and yet here we are, knee-deep in snow and loving every minute.',
      'Liam (now 7) has embraced country life by building snow tunnels and learning how to tap maple trees with our wonderful neighbor Silas. Maya (age 3) is a whirlwind of curiosity who insists on wearing her yellow rain boots whether it is sunny, rainy, or -10 degrees outside.',
      'David has set up his woodworking studio in the old red barn, and Sarah is designing wildflower gardens for next spring.',
      'Thank you for traveling this journey of life with us. May your home be filled with laughter and your heart with peace.'
    ],
    milestones: [
      { icon: 'Home', label: 'Farmhouse Move', text: 'Relocated from the city to 3 acres in Evergreen Pines' },
      { icon: 'Sparkles', label: 'Woodshop Born', text: 'Converted the 1890 red barn into David’s studio' },
      { icon: 'Trees', label: 'Maple Tapping', text: 'Tapped our first 6 backyard sugar maples with Liam' }
    ],
    enclosedPhotos: [
      {
        id: 'photo-2018-1',
        url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=800&q=80',
        caption: 'Our first Christmas morning in the farmhouse with the red barn behind us',
        location: 'Evergreen Pines Farm',
        year: 2018
      }
    ],
    signOff: 'Wishing you all our love across the miles,',
    signatures: ['David', 'Sarah', 'Liam', 'Maya'],
    tags: ['New Home', 'Milestones', 'Traditions'],
    favorite: false,
    themeColor: 'forest'
  }
];

export const ALL_TAGS = [
  'All',
  'Milestones',
  'Hiking & Travel',
  'Pets',
  'Recipes',
  'Traditions',
  'New Home',
  'Humor'
];
