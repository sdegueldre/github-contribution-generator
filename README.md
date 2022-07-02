# Github contribution generator

This project allows you to convert an image to a github repo that will make your contribution graph look like the image. For example the eyes_snails.png image in this repo:

![image](https://user-images.githubusercontent.com/42469486/177003889-448845f0-cf90-4f5d-8550-a6013df85469.png)

*(magnified 12 times here, images should be 52px wide by 7px high for the tool to work as intended)*


Will generate the following bash code (with different day numbers depending on what day you use the tool):
```bash
days_ago=("1;328" "1;321" "1;216" "1;209" "4;125" "4;118" "4;111" "4;104" "3;69" "3;62" "1;369" "4;334" "1;327" "1;320" "2;313" "4;222" "1;215" "1;208" "2;201" "4;131" "4;124" "4;117" "3;110" "4;103" "4;96" "3;68" "3;54" "2;368" "1;340" "1;333" "2;312" "2;305" "1;228" "1;221" "2;200" "2;193" "4;130" "4;123" "3;116" "4;109" "3;102" "4;95" "4;88" "3;67" "3;60" "3;53" "3;367" "1;339" "1;332" "2;311" "3;304" "1;227" "1;220" "2;199" "3;192" "4;129" "3;122" "4;115" "4;108" "3;101" "4;94" "4;87" "3;73" "3;66" "2;59" "4;366" "2;331" "2;324" "2;317" "3;310" "2;219" "2;212" "2;205" "3;198" "4;128" "4;121" "3;114" "4;107" "4;100" "4;93" "4;86" "3;79" "3;72" "3;65" "2;58" "2;323" "3;316" "2;274" "2;267" "2;260" "2;253" "2;211" "3;204" "4;120" "4;113" "3;106" "4;99" "4;92" "2;85" "2;78" "2;71" "2;64" "2;280" "2;266" "2;259" "2;245" "2;133" "2;126" "2;119" "2;112" "2;105" "2;98" "2;91" "2;84" "1;77" "1;70")

git init
for day in ${days_ago[@]}; do
    IFS=";" read -r -a arr <<< "${day}"
    for i in $(seq ${arr[0]}); do
        git commit --allow-empty -m "✨" --date "${arr[1]}.days.ago"
    done
done
```
Which, if these commits are your only activity on github for the last year, will make your contribution graph look like this:
![image](https://user-images.githubusercontent.com/42469486/177003850-b553da30-332e-4e38-afd5-cdd6ca9e46a3.png)


Currently, I don't do any scaling or color remapping, I take the top left 52 by 7 pixels of the image you choose and generate a number of commits that corresponds to the closest shade of green to that color, for best results, download the eyes_snail.png image from the repo and just draw your image using the same palette. Make sure all shades are present in sufficient amounts so that github doesn't treat those days as "outliers" and collapse two shades into one.

If you're using zsh, change the `-a` flag given to read to `-A`.

As far as I'm aware, github generates your activity when you push, and removing the commits by rewriting history and force-pushing won't remove the activity, the only way is to delete the repo completely. This project is completely impractical to use on a real account and your real contributions will mess with the graph and may shift the shades. Just make a novelty account to troll your friends.

Shout out to Nick Barth ([@nick-barth](https://github.com/nick-barth) on github, [star_ansible](https://www.twitch.tv/star_ansible) on Twitch) who inspired me to do this.

Try it yourself [here](https://sdegueldre.github.io/github-contribution-generator/)