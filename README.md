<img width="200" alt="Screen Shot 2024-07-08 at 10 29 48 AM" src="https://github.com/rollthecloudinc/spearhead/assets/73197190/836193c5-2c76-4070-9498-1c2cff47f1c3">

# Summary

Spearhead is a starter kit for quickly building and deploying low energy climate aware websites. Spearhead is equipped with [Quell](https://github.com/rollthecloudinc/quell) for rapid creation of low code web experiences also supporting hybrid app creation using multiple JavaScript frameworks. Backed by [HEDGE](https://github.com/rollthecloudinc/hedge) our climate aware data store tracking SCI. Built on top of the tried and true ever evolving Angular framework for modern front-end web development and AWS well architected framework sustainability pillar. The complete clean, low energy platform for climate aware web building.

# Local Set-up Instructions

The instructions to set-up Spearhead locally can be found in the below wiki page.

https://github.com/rollthecloudinc/spearhead/wiki/Spearhead-Website-Local-Set-up-Instructions

# Features

* Low Energy
* SEO Friendly
* High Availability Low Latency
* In Place Editing
* SCI Tracking
  * Back-end
  * Front-End
* Dev Tools Styling
* Carbon Awareness
* Application Embedding
* Extensibe Plugin System
* Transparency
* Github Native

## Low Energy

Spearhead web apps run completely in the browser without any additional page loads unless publishing or editing new pages. Builders can optionally disable JavaScript for deployment adding to sustainability of Spearhead websites.

Standard Beacon Score

<img width="1440" alt="Screen Shot 2023-06-17 at 6 06 34 AM" src="https://github.com/rollthecloudinc/spearhead/assets/73197190/57db30bc-c728-41de-b4ef-8318e6e0f960">

Pure static with Angular removed Beacon score.

<img width="1440" alt="Screen Shot 2022-11-28 at 7 19 07 PM" src="https://user-images.githubusercontent.com/73197190/204410728-4f091ce9-2e94-497c-87b7-45d0c2d67290.png">

## SEO Friendly

Spearhead pages are pre-rendered on the server as HTML. Initial page loads include the physical HTML right on the page. Subsequent page changes run completely in the browser without additional network requests. The data used to generate pages is compiled directly into the source code to neautralize network traffic during a continuous publishing and/or reading session.

Standard Lighthouse Evaluation

<img width="1440" alt="Screen Shot 2023-06-12 at 7 33 07 PM" src="https://github.com/rollthecloudinc/spearhead/assets/73197190/af444bc0-d2d0-478e-ab86-caab308eb2cd">

## High Availability Low Latency

Spearhead wep apps run on CDNs. The presentation website runs on Azure Static Web Apps with enterprise grade edge enabled. However, Spearhead web apps can be hosted on any CDN – aws, cloudflare, github, gitlab, etc.

## In Place Editing – [Quell](https://github.com/rollthecloudinc/quell)

Publish and edit pages directly in the browser without additional page loads never leaving the site. 

> Publishing and editing is disabled for production deployments that opt into running the site without JavaScript.

<img width="1440" alt="Screen Shot 2022-11-25 at 3 04 31 PM" src="https://user-images.githubusercontent.com/73197190/204050666-33fb1284-1f3c-4a8f-915b-4ec4748fe9c1.png">

## SCI – Software Carbon Intensity Tracking

Tracks both front and back end emissions. Logs back-end SCI inside AWS Open Search. Once in open search data can be analyzed for opporunities to reduce emissions and purchase offsets. Users can contribute to offset of Spearhead web app deployments emissions by using the contribute button within the header of every site (@todo).

<img width="1440" alt="Screen Shot 2022-11-15 at 7 08 47 AM" src="https://user-images.githubusercontent.com/73197190/204052881-d8e6ab2c-957f-4078-a363-26a612850b0f.png">

## Dev Tools Styling

Spearhead wep apps can be styled using Tail Wind CSS directly in the browser without code changes. Browser dev tools can be used to add Tail Wind CSS classes to customize pages. Classes added within the dev tools are retained and applied to future page loads. 

> This feature is not currently supported when deploying to production without JavaScript.

https://youtu.be/0dP7lS8eUEE

## Carbon Awareness – [HEDGE](https://github.com/rollthecloudinc/hedge)

Spearhead wep apps are backed by our award winning clean energy carbon aware data store HEDGE.

![carbonhack_cert](https://user-images.githubusercontent.com/73197190/204116115-a60ea43d-6d50-4741-ab0e-97c58355f96d.png)

## Application Embedding

Outside applications can be natively embedded into pages using web pack 5 module federation. Devs can create micro-frontends that deomonstrate features which can then be hosted inside pages without an iframe. Spearhead wep apps are native orchestration platforms for micro-frontends.

<img width="1440" alt="Screen Shot 2022-11-26 at 8 56 49 PM" src="https://user-images.githubusercontent.com/73197190/204115805-99ff3750-3a9a-45f5-ae9b-8ae7ece3af2f.png">

## Extensibe Plugin System

Spearhead plugins are completely independent web apps that can be included at runtime into any spearhead web app. Plugins can be added without modifying spearhead web app and/or host application that the plugin will be used. This enables development of plugins that extend spearhead web apps independent of the core web app itself. Plugin authors deploy plugins on CDNs as small, independent web apps that are loaded remotely. Once plugins are published can be included at runtime in the browser when building pages without changing any code or installing new software. For more details about plugins and creating them visit the pluin starter kit project below.

https://github.com/rollthecloudinc/quell-plugin

## Transparency

Roll the Coud web site front-end carbon emissions are publicly reported using statsy.

https://statsy.com/share/spearhead-docs.carbonfreed.app/co2?from=1669509927&to=1669514756&type=all-time

<img width="1440" alt="Screen Shot 2022-11-26 at 9 07 25 PM" src="https://user-images.githubusercontent.com/73197190/204116069-c6c3e32e-b7d0-484a-babb-ad2acb5dc02e.png">

## Github Native

Github is used extensively for Roll the Cloud enterprise apps. We store data in object repos. We achieve automation using Github Actions for continuous deployments. All code is open source and available on Github. Spearhead wep app deployments can also be hosted on Github Pages free of costs without sacrificing latency or availability.

# Setup

Manual set-up instructions for new spearhead aka: carbonfree website.

https://github.com/rollthecloudinc/carbonfree/wiki/Automating-Carbonfreed-Website-Setup

# Distributions

## Documentation

Spearhead distribution for rapid dev of documentation websites.

https://github.com/rollthecloudinc/spearhead-docs

## Blogs

Spearhead distribution for rapid development of blogs.

https://github.com/rollthecloudinc/spearhead-blog (@todo)

## Shop

Spearhead distribution for rapid development of product catalog / ecommerce website.

https://github.com/rollthecloudinc/spearhead-commerce (@todo)

## Charity

Spearhead distribution for rapid development of nonprofit / 501(c)3 charity website.

https://github.com/rollthecloudinc/spearhead-charity (@todo)

## Vial

Adaptable SCI reporting dashboard.

https://github.com/rollthecloudinc/vial
