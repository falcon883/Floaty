<template>
  <div class="faq">
    <div
      class="hero is-fullheight-with-navbar is-justify-content-flex-start is-too-dark is-text-white p-6"
    >
      <h1 class="title is-text-white mb-5">Frequently Asked Questions</h1>
      <div class="ques">
        <h1 class="is-size-4 is-text-white">
          Q. How do I get the inspect link?
        </h1>
        <article class="message is-warning mt-2">
          <div class="message-body">
            <p>
              To get the inspect link of skin listed on Steam Market, head over
              to
              <strong
                ><a
                  href="https://steamcommunity.com/market/search?appid=730"
                  target="_blank"
                  >Steam Market</a
                ></strong
              >
              then search for and open your specific skin then right click (hold
              press on phone) on following button
              <button class="inspect-btn">Inspect in Game...</button>
              then click on <strong>Copy link address.</strong>
            </p>
            <img class="image mt-3" src="../assets/static/inspect.png" alt="" />
          </div>
        </article>
      </div>
      <div class="ques mt-5">
        <h1 class="is-size-4 is-text-white">Q. What is float value in CSGO?</h1>
        <article class="message is-warning mt-2">
          <div class="message-body">
            <p>
              Every weapon skin in CSGO has a float value ranging from
              <strong>0.0</strong> to <strong>1.0</strong>, which describes its
              wear. Here <strong>0</strong> means the skin is in perfect
              condition, and as the value increases to <strong>1</strong>, its
              condition degrades gradually. Float values are fixed and assigned
              automatically whenever the skin is dropped or received by opening
              cases.
            </p>
          </div>
        </article>
      </div>
      <div class="ques mt-5">
        <h1 class="is-size-4 is-text-white">
          Q. Is the float value of a skin displayed on steam or in the game?
        </h1>
        <article class="message is-warning mt-2">
          <div class="message-body">
            <p>
              Although Steam does not display the float value in market listings
              and in the game, rather they display the wear condition derived by
              it. But it is still possible to check it using 3rd-party tools.
            </p>
          </div>
        </article>
      </div>
      <div class="ques mt-5">
        <h1 class="is-size-4 is-text-white">
          Q. How can I check float value of a skin?
        </h1>
        <article class="message is-warning mt-2">
          <div class="message-body">
            <p>
              To check the float value of a skin, you can use our tool. It's
              pretty simple to use, just copy the inspect link and paste it in
              the input box and then click on <strong>Check</strong> button.
            </p>
          </div>
        </article>
      </div>
      <div class="ques mt-5">
        <h1 class="is-size-4 is-text-white">
          Q. What is wear level / condition of a skin?
        </h1>
        <article class="message is-warning mt-2">
          <div class="message-body">
            <p>
              Just as every weapon skin in CSGO has a float value, it also has a
              wear level/condition also called as exterior quality. This wear
              level is nothing but a representation of the float value. There
              are five levels ranging from best to worst:
            </p>
            <table class="table is-bordered my-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Exterior Quality</th>
                  <th>Float Value Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Factory New (FN)</td>
                  <td>0.00 to 0.07</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Minimal Wear (MW)</td>
                  <td>0.07 to 0.15</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Field-Tested (FT)</td>
                  <td>0.15 to 0.38</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Well-Worn (WW)</td>
                  <td>0.38 to 0.45</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Battle-Scarred (BS)</td>
                  <td>0.45 to 1.00</td>
                </tr>
              </tbody>
            </table>
            <p>
              As the level goes down, the skin appears to be scratched and has
              missing textures.
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "faq",
};
</script>

<style lang="scss">
h1 {
  font-family: "Raleway", sans-serif;
}
.inspect-btn {
  border-radius: 2px;
  border: none;
  padding: 3px 15px;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(to bottom, #acb5bd 5%, #414a52 95%);
}
</style>
