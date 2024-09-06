let p=751
let Generate=()=>{
    let y2;
    let y;
    let num = "";
    for (let i=201;i<=235;i++) {
        y2 = ((i ** 3) - i + 1) % p;
        y = Math.round(Math.sqrt(y2), 2);
        let ystr = y.toString().replace(',','.');
        num += "(" + i + "," + ystr + "),";
    }
    return num
}
console.log("TASK 1")
console.log("Points Xmin=201, Xmax=235: ")
console.log(Generate())


p=BigInt(p)
const bi0 = BigInt(0)
const bi1 = BigInt(1)
const bi2 = BigInt(2)
const bi3 = BigInt(3)

const absMod = (n, p) => n < bi0 ? (n % p) + p : n % p

 function pointAdd (xp, yp, xq, yq, p) {
  const lambda = (yq - yp) / (xq - xp)
  const x = absMod(lambda ** bi2 - xp - xq, p)
  const y = absMod(lambda * (xp - x) - yp, p)
  return { x, y }
}

 function pointDouble (xp, yp, a, p) {
  const numer = bi3 * xp ** bi2 + a
  const denom = (bi2 * yp) ** (p - bi2)
  const lambda = (numer * denom) % p
  const x = absMod(lambda ** bi2 - bi2 * xp, p)
  const y = absMod(lambda * (xp - x) - yp, p)
  return { x, y }
}

 function pointMultiply (d, xp, yp, a, p) {
  const add = (xp, yp, { x, y }) => pointAdd(xp, yp, x, y, p)
  const double = (x, y) => pointDouble(x, y, a, p)
  const recur = ({ x, y }, n) => {
    if (n === bi0) { return { x: bi0, y: bi0 } }
    if (n === bi1) { return { x, y } }
    if (n % bi2 === bi1) { return add(x, y, recur({ x, y }, n - bi1)) }
    return recur(double(x, y), n / bi2)
  }
  return recur({ x: xp, y: yp }, d)
}
const a = BigInt('2')
const p1 = { x: BigInt(37), y: BigInt(17) }
const p2 = { x: BigInt(40), y: BigInt(11) }
const p3 = { x: BigInt(64), y: BigInt(27) }

const k = BigInt(11)
const l=BigInt(4)
console.log("kP")
console.log(pointMultiply(k, p1.x, p1.y, a, p))
console.log("P+Q")
console.log(pointAdd(p1.x,p1.y,p2.x,p2.y,p))
let a1=pointMultiply(k, p1.x, p1.y, a, p)
let a2=pointMultiply(l, p2.x, p2.y, a, p)
let a3=pointAdd(a1.x,a1.y,a2.x,a2.y,p)
let a4=pointAdd(a3.x,a3.y,-p3.x,-p3.y,p)
console.log("kP+IQ-R")
console.log(a4)
let a5=pointAdd(p1.x,p1.y,-p2.x,-p2.y,p)
let a6=pointAdd(a5.x,a5.y,p3.x,p3.y,p)
console.log("P-Q+R")
console.log(a6)

console.log("----------------------------------------")

console.log("TASK 2")

const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

const bob = nacl.box.keyPair()
const alice = nacl.box.keyPair()

const nonce = nacl.randomBytes(24)

const utf8 = 'Koktysh'

const box = nacl.box(
  nacl.util.decodeUTF8(utf8),
  nonce,
  alice.publicKey,
  bob.secretKey
)
 console.log("Q: "+alice.publicKey)
const message = {box, nonce} 
console.log("Encrypt: "+box)

const payload = nacl.box.open(message.box, message.nonce, bob.publicKey, alice.secretKey)
const decode = nacl.util.encodeUTF8(payload) // <-- 'Hello Alice'
console.log("Decrypt: "+decode)

console.log("----------------------------------------")

console.log("TASK 3")

var crypto = require("crypto");
var eccrypto = require("eccrypto");

var privateKey = eccrypto.generatePrivate();

var publicKey = eccrypto.getPublic(privateKey);

var str = "Koktysh";

var msg = crypto.createHash("sha256").update(str).digest();

eccrypto.sign(privateKey, msg).then(function(sig) {
  console.log("Signature: ", sig);
  eccrypto.verify(publicKey, msg, sig).then(function() {
    console.log("Signature is OK");
  }).catch(function() {
    console.log("Signature is BAD");
  });
});