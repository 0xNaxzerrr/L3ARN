"server only"

import { PinataSDK } from "pinata"

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.NEXT_PUBLIC_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEAWAY_URL}`
})
