-- ─── City Travel Tips ───────────────────────────────────────
-- Populates travel_tips for all host cities with practical
-- guidance for transport, neighborhoods, and matchday logistics.

UPDATE cities
SET travel_tips =
'Getting around:
• The subway is the fastest way around Manhattan and many parts of Brooklyn/Queens; buy a contactless OMNY tap fare or MetroCard.
• To reach MetLife Stadium, most fans take NJ Transit from New York Penn Station to Secaucus Junction, then transfer to Meadowlands rail service on event days.
• Allow extra time for post-match rail queues back to Manhattan.

Where to stay:
• First-time visitors usually prefer Midtown, Lower Manhattan, Long Island City, or Downtown Brooklyn for easy transit.
• Staying in New Jersey (Jersey City/Hoboken) can be cheaper while still giving quick access to Manhattan and stadium trains.

Practical advice:
• Distances are bigger than they look on maps; plan one or two neighborhoods per day.
• Tipping is standard (typically 18–20% at sit-down restaurants).
• Summer can be hot and humid: carry water and use sunscreen for daytime sightseeing.'
WHERE slug = 'new-york-new-jersey';

UPDATE cities
SET travel_tips =
'Getting around:
• Los Angeles is spread out; combine Metro with rideshare for the smoothest trips.
• The K and C Metro lines plus shuttle connections can help with SoFi Stadium days, but expect traffic and leave early.
• If you rent a car, budget for parking fees almost everywhere.

Where to stay:
• Santa Monica, Culver City, Downtown LA, and Hollywood are common bases depending on your priorities.
• For quickest stadium access, Inglewood/LAX-adjacent hotels reduce matchday travel time.

Practical advice:
• Commute times vary dramatically by hour; avoid cross-city trips in peak traffic.
• Evenings can feel cooler than daytime near the coast—bring a light layer.
• Book popular restaurants and studio attractions in advance, especially on weekends.'
WHERE slug = 'los-angeles';

UPDATE cities
SET travel_tips =
'Getting around:
• Dallas-Fort Worth is car-centric; rideshare or rental car is usually easiest for visitors.
• AT&T Stadium is in Arlington (between Dallas and Fort Worth), so check travel time from your hotel carefully.
• DART rail is useful within Dallas proper but does not directly serve the stadium.

Where to stay:
• Uptown/Downtown Dallas works well for nightlife and dining.
• Arlington hotels are best for minimizing matchday stress.

Practical advice:
• Summer heat is intense—plan midday indoor activities and hydrate often.
• Distances between attractions are large; group plans by area.
• On game days, arrive early for security lines and heavy traffic around parking lots.'
WHERE slug = 'dallas';

UPDATE cities
SET travel_tips =
'Getting around:
• Use BART, Muni, and Caltrain to avoid traffic and parking issues.
• Levi''s Stadium is in Santa Clara; many fans connect via Caltrain + VTA light rail on event days.
• If driving to the stadium, reserve parking in advance when available.

Where to stay:
• San Francisco neighborhoods like Union Square, SoMa, and Fisherman''s Wharf are convenient for sightseeing.
• Santa Clara/San Jose is practical if your priority is easy stadium access.

Practical advice:
• Bay Area microclimates are real: bring layers, even in summer.
• Hills can make walking slower than expected; wear comfortable shoes.
• Restaurant reservations are recommended in popular districts and before major matches.'
WHERE slug = 'san-francisco';

UPDATE cities
SET travel_tips =
'Getting around:
• Link light rail is the easiest way between Sea-Tac Airport, downtown, and many popular areas.
• Lumen Field is walkable from downtown and well connected by rail and buses.
• Ferries are a scenic option if you are exploring waterfront areas.

Where to stay:
• Downtown, Belltown, South Lake Union, and Capitol Hill are good visitor bases.
• Stay near Link stations if you want simple airport and matchday transfers.

Practical advice:
• Weather can change quickly—pack a light rain layer year-round.
• Coffee shops can be busy in the morning; mobile ordering helps.
• On matchdays, arrive early for pre-game crowds around Pioneer Square.'
WHERE slug = 'seattle';

UPDATE cities
SET travel_tips =
'Getting around:
• The MBTA ("T") is the main option for visitors; get a CharlieCard or contactless tap fare where supported.
• Gillette Stadium is in Foxborough, well outside central Boston—special event trains may run for select matches, otherwise plan coach, rideshare, or rental car.
• Travel times to Foxborough can be long, especially after evening kickoffs.

Where to stay:
• Back Bay, Downtown, Seaport, and Cambridge are popular and transit-friendly.
• If attending only one match and leaving quickly, staying near Foxborough can simplify logistics.

Practical advice:
• Boston is very walkable but historic streets can be irregular—comfortable shoes are essential.
• Book seafood spots and Freedom Trail tours ahead in peak season.
• Even in summer, nights can feel cool compared with daytime.'
WHERE slug = 'boston';

UPDATE cities
SET travel_tips =
'Getting around:
• SEPTA (Broad Street Line, Market-Frankford Line, regional rail, buses) covers most visitor routes.
• Lincoln Financial Field is in the South Philadelphia Sports Complex and is easy to reach by Broad Street Line to NRG Station.
• Walking between Center City sights is straightforward and often faster than short taxi trips.

Where to stay:
• Center City, Rittenhouse, Midtown Village, and Old City are strong bases for first-time visitors.
• South Philly stays can help on matchday but have fewer hotel options.

Practical advice:
• Try local staples like cheesesteaks and roast pork, but expect lines at famous spots.
• Keep small cash/card flexibility for smaller food vendors.
• Build in time for museum-heavy days—there is a lot to cover in one area.'
WHERE slug = 'philadelphia';

UPDATE cities
SET travel_tips =
'Getting around:
• Metrorail/Metromover works in selected areas, but rideshare is common for many trips.
• Hard Rock Stadium is in Miami Gardens; matchday shuttles or rideshare are usually easiest from central zones.
• Traffic can spike around beaches and causeways—leave buffer time.

Where to stay:
• South Beach for nightlife, Brickell/Downtown for city convenience, and Wynwood for food/art scenes.
• Aventura or North Miami options can reduce stadium transfer time.

Practical advice:
• Heat, sun, and humidity are serious—hydrate constantly and reapply sunscreen.
• Afternoon thunderstorms are common in warmer months; keep flexible plans.
• Dress codes are stricter at some nightlife venues, so check before heading out.'
WHERE slug = 'miami';

UPDATE cities
SET travel_tips =
'Getting around:
• MARTA rail is useful from the airport to downtown/midtown; rideshare fills the gaps.
• Mercedes-Benz Stadium is near downtown with good transit links on event days.
• If driving, expect congestion and pre-book parking where possible.

Where to stay:
• Downtown and Midtown are convenient for matches and attractions.
• Buckhead offers more upscale hotels and dining, but longer stadium transfers.

Practical advice:
• Summer is hot and humid; light clothing plus hydration are essential.
• Popular food halls and restaurants can be crowded—reserve when possible.
• Allocate extra time for the Georgia Aquarium/World of Coca-Cola area on busy days.'
WHERE slug = 'atlanta';

UPDATE cities
SET travel_tips =
'Getting around:
• Public transport is limited; rental car or rideshare is usually the most practical option.
• Arrowhead Stadium is in the Truman Sports Complex area, about a 15–20 minute drive from downtown in normal traffic.
• Parking logistics are important—arrive early for big matchdays.

Where to stay:
• Downtown/Crossroads/Power & Light areas are good for first-time visitors.
• Suburban stays may be cheaper but increase reliance on driving.

Practical advice:
• Kansas City is famous for barbecue—book top spots early on weekends.
• Distances are manageable by car, but not always walkable between districts.
• Weather swings are possible; check forecasts and pack layers.'
WHERE slug = 'kansas-city';

UPDATE cities
SET travel_tips =
'Getting around:
• Houston is car-oriented; rideshare or rental car is usually easiest.
• METRORail Red Line helps for key corridors (including the Museum District and Texas Medical Center near NRG Stadium).
• Matchday traffic can be heavy—leave early and confirm your pickup/parking plan.

Where to stay:
• Downtown, Midtown, and the Museum District are strong visitor bases.
• Galleria/Uptown has many hotel options but longer stadium travel in peak traffic.

Practical advice:
• Heat and humidity can be intense for much of the year—hydrate and plan indoor breaks.
• Houston is very spread out, so cluster activities by neighborhood.
• The city has outstanding international food—reservations are smart for popular spots.'
WHERE slug = 'houston';
