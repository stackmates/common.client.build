'use strict';

var multiline = require('multiline');

module.exports = multiline(function(){/*
<div class='l-content-container'>

  <div class='l-content content content--{{$state.current.name}}' role='main'>

    <section id="intro" class='l-section intro intro--{{$state.current.name}}' role='banner'>

      <div class='l-site-width l-intro'>

        <div class='l-copy-width'>

          <h1>Testing Practices</h1>

        </div>

      </div>

    </section>

    <section class='l-section view'>

      <div class='l-site-width l-view'>

        <div class='l-copy-width' ng-init="text='hello'">

          <h2>{{text}}</h2>

          <text-and-sub text={{text}} sub="hello"></text-and-sub>

          <p>Not much to see here, check out the source</p>

          <ui-view></ui-view>

          <p><a ui-sref='home'>Home</a></p>

        </div>

      </div>

    </section>

  </div>
</div>
*/});