/*
size-label-action
GitHub action to assign labels based on pull request change sizes.

Labels are taken from https://github.com/kubernetes/kubernetes/labels?q=size

Usage
Create a .github/workflows/size-label.yml file:

name: size-label
on: pull_request_target
jobs:
  size-label:
    permissions:
      contents: read
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - name: size-label
        uses: "pascalgn/size-label-action@v0.5.5"
        env:
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
Create the needed labels
Export both GITHUB_TOKEN and REPO (e.g. my-username/my-repository) and run the script below:

for size in XL XXL XS S M L; do
  curl -sf -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/kubernetes/kubernetes/labels/size/$size" |
    jq '. | { "name": .name, "color": .color, "description": .description }' |
    curl -sfXPOST -d @- -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/repos/$REPO/labels
done
Configuration
The following optional environment variables are supported:

IGNORED: A list of glob expressions separated by newlines. Files matching these expressions will not count when calculating the change size of the pull request. Lines starting with # are ignored and files matching lines starting with ! are always included.
HTTPS_PROXY: A proxy URL to pass to https-proxy-agent which will be used to proxy requests to the GitHub API.
You can configure the environment variables in the workflow file like this:

        env:
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
          IGNORED: ".*\n!.gitignore\nyarn.lock\ngenerated/**"
Custom sizes
The default sizes are:

{
  "0": "XS",
  "10": "S",
  "30": "M",
  "100": "L",
  "500": "XL",
  "1000": "XXL"
}
You can pass your own configuration by passing sizes

name: size-label
on: pull_request_target
jobs:
  size-label:
    permissions:
      contents: read
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - name: size-label
        uses: "pascalgn/size-label-action@v0.5.5"
        env:
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
        with:
          sizes: >
            {
              "0": "XS",
              "20": "S",
              "50": "M",
              "200": "L",
              "800": "XL",
              "2000": "XXL"
            }
Using with other actions
If creating workflow with multiple jobs, they can react on the label set by this action:

name: size-label
on: pull_request_target
jobs:
  label:
    permissions:
      contents: read
      pull-requests: write
    runs-on: ubuntu-latest
    outputs:
      label: ${{ steps.label.outputs.sizeLabel }}
    steps:
      - name: size-label
        id: label
        uses: "pascalgn/size-label-action@v0.5.5"
        env:
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
  comment:
    runs-on: ubuntu-latest
    needs: label
    if: ${{ contains(needs.label.outputs.label, 'XL') }}
    steps:
      - run: echo "Too big PR"
License
MIT

GitHub action to assign labels based on pull request change sizes

Topics
github github-api hacktoberfest github-action
Resources
 Readme
License
 MIT license
 Activity
Stars
 93 stars
Watchers
 5 watching
Forks
 50 forks
Release 0.5.5
Latest
on Oct 23, 2024
Contributors
15
@pascalgn
@rafaelmagu
@caarlos0
@davidparsson
@mrchief
@DanielMSchmidt
@msonowal
@aslafy-z
@mat3e
@levsa
@donovanmuller
@jmnote
@fty4
@dependabot[bot]
@dione-kist-jemmic
JavaScript
100.0%
Report repository
Footer

 */
