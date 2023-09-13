# Tracecontext
The trace context is a way we can track information across multiple services.

it starts with a `traceid` and each service updates it adding the `span in`.

# Transaction authorizing

Virtualterminal/pay links authorizing/apple pay checkout -> https://github.com/gdcorp-commerce/virtual-terminal/blob/master/lib/poynt-collect.js#L21
Invoice authorizing -> https://github.com/gdcorp-commerce/virtual-terminal/blob/master/lib/invoice-v2.js#L234

Ecommerce reference -> https://github.com/gdcorp-commerce/virtual-terminal/blob/master/src/routes/e-commerce.ts#L42

# References

- [https://www.w3.org/TR/trace-context/](https://www.w3.org/TR/trace-context/)
- [https://www.npmjs.com/package/traceparent](https://www.npmjs.com/package/traceparent)
- [https://luizlelis.com/blog/tracecontext](https://luizlelis.com/blog/tracecontext)
- [https://godaddy-corp.atlassian.net/wiki/spaces/CKPT/pages/92314294/Event+Tracing+using+W3C+TraceID+Header](https://godaddy-corp.atlassian.net/wiki/spaces/CKPT/pages/92314294/Event+Tracing+using+W3C+TraceID+Header)
