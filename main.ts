pins.setPull(DigitalPin.P12, PinPullMode.PullDown)
pins.setPull(DigitalPin.P8, PinPullMode.PullDown)
pins.setPull(DigitalPin.P1, PinPullMode.PullDown)
pins.setPull(DigitalPin.P0, PinPullMode.PullDown)
pins.digitalWritePin(DigitalPin.P2, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
function checkPin(pin: DigitalPin) {
    if (pins.digitalReadPin(pin)) {
        while (pins.digitalReadPin(pin)) { }
        return true
    }
    return false
}
function getRow(pin: DigitalPin, offset: number): number {
    let ch = -1
    pins.digitalWritePin(pin, 1)
    control.waitMicros(4)
    if (checkPin(DigitalPin.P12)) ch = offset + 1;
    if (checkPin(DigitalPin.P8)) ch = offset + 2;
    if (checkPin(DigitalPin.P1)) ch = offset + 3;
    if (checkPin(DigitalPin.P0)) ch = offset + 4;
    pins.digitalWritePin(pin, 0)
    return ch;
}
function getKey() {
    let ch = getRow(DigitalPin.P2, 0);
    if (ch > 0) return ch
    ch = getRow(DigitalPin.P13, 4);
    if (ch > 0) return ch
    ch = getRow(DigitalPin.P14, 8);
    if (ch > 0) return ch
    ch = getRow(DigitalPin.P15, 12);
    return ch
}
basic.forever(function () {
    let ch = getKey()
    if (ch > 0) basic.showNumber(ch)
})