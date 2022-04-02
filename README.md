# Overview

Opinionated rapid development framework built on top of Angular and AWS cloud.

Realize environmentally friendly 0 server, 0 trust, 0 cost user-friendly, modern web experiences.

# Advantages

* fast
* secure
* low cost
* highly available
* scalable
* low latency
* user-friendly
* extensible
* responsive
* customizable
* seo friendly

# Features

* Micro front-end orchestration
* Codeless page building

## Snippets

Create html and markdown pages.

## Datasources

Query REST APIs and display data.

## Forms

Build forms.

## Orchestrate

Embed external applications.

## Extend

Extend capabilities using outside apps.

# Installation

## Clone

Clone repo to host machine.

```bash
git clone git@github.com:ng-druid/spearhead.git myproject
```

## Install Modules

Install node modules.

```
cd myproject
npm install
```

## Serve

Serve on localhost.

```bash
ng serve
```

## Visit

Visit the page editor inside the browser.

* http://localhost:4000/pages/create-panel-page

>> The network tab can be used to see pages post but fail to save. Saving pages requires setting up aws respurces.

# Minimal AWS Setup

Traditional databases are not used. Instead AWS cloud services are used to authenticate users, store and search data.

## Cognito

Users are stored in aws cognito. OAuth is used to authenticate and authorize resource access and operations in aws.

## s3

Entities that would otherwise be stored in relational databaase tables are instead saved as json objects in aws s3. Media uploads like images, videos, audo, pdfs, etc. are also stored on s3.

## Open Search

Entities are copied to open search either fully, partially, or optimized for search.

# Publishing

Sites can be published to the web as a static site using Angular pre-rendering. Once pages are pre-rendered they can hosted on any host that supports static sites like github, aws, gitlab, etc. The recommended host is a CDN like aws s3. In future tools to easily deploy sites to vendors like aws s3 will be made available.

# Demos

Build forms and collect data.

* https://ng-druid.github.io/native_forms_rebuild_v1/89087abb-326d-4a93-888e-9c597ba81b8e
* https://ng-druid.github.io/native_forms_rebuild_v1/89087abb-326d-4a93-888e-9c597ba81b8e/manage

## Consume

Consume REST APIs and display data.

* https://ng-druid.github.io/dev-test-virtual-list-flex-v1/character/1011334
* https://ng-druid.github.io/dev-test-virtual-list-flex-v1/character/1011334/manage

## Orchestrate

Embed external applications.

* https://ng-druid.github.io/workflow-designer-v2
* https://ng-druid.github.io/workflow-designer-v2/manage

## Extend

Extend system at runtime using external applications.

* https://ng-druid.github.io/tractorbeam-test-v3
* https://ng-druid.github.io/tractorbeam-test-v3/manage
