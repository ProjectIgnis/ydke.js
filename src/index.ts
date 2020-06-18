// Copyright (C) 2020  Kevin Lu
// SPDX-License-Identifier: LGPL-3.0-or-later

// Note: the following conversions depend on little-endian byte order and
// is approximately equivalent to a pointer cast. This could be made
// endianness-independent in the future but there is not much demand
// considering that the x86 and ARM architectures that this code will run on
// are little-endian.
export function base64ToPasscodes(base64: string): Uint32Array {
    return new Uint32Array(
        Uint8Array.from(
            Buffer.from(base64, "base64")
        ).buffer
    );
}

export function passcodesToBase64(passcodes: Uint32Array): string {
    return Buffer.from(new Uint8Array(passcodes.buffer)).toString("base64");
}


export interface TypedDeck {
    main: Uint32Array, extra: Uint32Array, side: Uint32Array;
}

export function parseURL(ydke: string): TypedDeck {
    if (!ydke.startsWith("ydke://")) {
        throw new Error("Unrecognized URL protocol");
    }
    const components = ydke.slice("ydke://".length).split("!");
    if (components.length < 3) {
        throw new Error("Missing ydke URL component");
    }
    return {
        main: base64ToPasscodes(components[0]),
        extra: base64ToPasscodes(components[1]),
        side: base64ToPasscodes(components[2])
    };
}

export function toURL(deck: TypedDeck): string {
    return "ydke://" +
        passcodesToBase64(deck.main) + "!" +
        passcodesToBase64(deck.extra) + "!" +
        passcodesToBase64(deck.side) + "!";
}

export function extractURLs(from: string): string[] {
    const ydkeReg = /ydke:\/\/[A-Za-z0-9+/=]*?![A-Za-z0-9+/=]*?![A-Za-z0-9+/=]*?!/g;
    let match = ydkeReg.exec(from);
    const matches = [];
    while (match !== null) {
        matches.push(match[0]);
        match = ydkeReg.exec(from);
    }
    return matches;
}
