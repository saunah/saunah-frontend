const checkCodeCoverageMethodOne = () => {
    checkCodeCoverageMethodTwo()
}
const checkCodeCoverageMethodTwo = () => {
    checkCodeCoverageMethodOne()
}

export default checkCodeCoverageMethodOne
