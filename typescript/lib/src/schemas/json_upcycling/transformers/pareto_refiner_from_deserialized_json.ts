import * as p_ from 'pareto-core/transformer'

import * as s_source from "../schema.js"
import * as s_target from "pareto/modules/pareto_new/schemas/refiner/schema"

namespace declarations {

    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Root
    >

    export type Value = p_.Transformer_With_Parameter<
        s_source.Value,
        s_target.Expression,
        {
            'type': string,
            'temp value reference tail': s_target.Value_Reference.subselection
        }
    >
}

import * as sh from "pareto/modules/pareto_new/schemas/refiner/shorthands/target"

export const Schema: declarations.Root = ($) => sh.root(
    true,
    sh.schema_reference.sr.external("pareto-json", "deserialization", "deserialized json"),
    p_.literal.set(sh.schema_reference.sr.external("pareto-json", "unmarshalling", "json value unmarshalling")),
    p_.literal.not_set(),
    p_.literal.dictionary({}),
    p_.literal.dictionary({
        "unmarshalled from deserialized json": sh.dependency.refiner.external(
            "pareto-json",
            "unmarshalling",
            "unmarshalled json value",
            "deserialized json"
        )
    }),
    p_.from.dictionary($.types).map(
        ($) => sh.declaration.refiner(
            sh.schema_reference.value_reference(
                "Value",
                p_.literal.list([])
            ),
            p_.literal.set(sh.schema_reference.type_reference(
                "Error",
            )),
            p_.literal.not_set(),
        )
    ),
    p_.from.dictionary($.types).map(
        ($, id) => sh.implementation(
            true,
            false,
            Value(
                $,
                {
                    'type': id,
                    'temp value reference tail': p_.literal.list([]),
                }
            )
        ),

    )
)

export const Value: declarations.Value = ($, $p) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'array': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'list': return p_.option($, ($) =>  sh.expr.implement_me("ARRAY, LIST"))
                        case 'group': return p_.option($, ($) =>  sh.expr.implement_me("ARRAY, GROUP"))
                        case 'cycle up':return p_.option($, ($) =>  sh.expr.implement_me("ARRAY, SPECIAL"))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            case 'boolean': return p_.option($, ($) => sh.expr.implement_me("BOOLEAN"))
            case 'component': return p_.option($, ($) => sh.expr.implement_me("COMPONENT"))
            case 'null': return p_.option($, ($) => sh.expr.implement_me("NULL"))
            case 'nullable': return p_.option($, ($) => sh.expr.implement_me("NULLABLE"))
            case 'number': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'integer': return p_.option($, ($) => sh.expr.implement_me("NUMBER, INTEGER"))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            case 'object': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'group': return p_.option($, ($) => sh.expr.implement_me("OBJECT, GROUP"))
                        case 'cycle up':return p_.option($, ($) => sh.expr.implement_me("OBJECT, SPECIAL"))
                        case 'dictionary':return p_.option($, ($) => sh.expr.implement_me("OBJECT, DICTIONARY"))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            case 'string': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'cycle up': return p_.option($, ($) => sh.expr.implement_me("STRING, SPECIAL"))
                        case 'text':return p_.option($, ($) => sh.expr.implement_me("STRING, TEXT"))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            // case 'component': return p_.option($, ($) => sh.expr.convert.component.transform(
            //     sh.select.context_value(
            //         p_.literal.list([])
            //     ),
            //     p_.from.state($.type).decide(
            //         ($) => {
            //             switch ($[0]) {
            //                 case 'external': return p_.option($, ($) => sh.expr.convert.component.transform_.external(
            //                     p_.literal.segmented_text([
            //                         "external ",
            //                         $.import['l id']
            //                     ]),
            //                     $.module['l id']
            //                 ))
            //                 case 'internal': return p_.option($, ($) => sh.expr.convert.component.transform_.local($['l id']))
            //                 case 'internal acyclic': return p_.option($, ($) => sh.expr.convert.component.transform_.local($['l id']))
            //                 default: return p_.exhaustive($[0])
            //             }
            //         }
            //     ),
            //     'pass through',
            //     null,
            // ))
            // case 'dictionary': return p_.option($, ($) => {
            //     return sh.expr.change_context(
            //         sh.select.call(
            //             sh.select.call_.external(
            //                 "unmarshalled from parse tree",
            //                 "Dictionary"
            //             ),
            //             sh.select.context_value(
            //                 p_.literal.list([])
            //             ),
            //             'pass through',
            //             null,
            //             p_.literal.list([]),
            //         ),
            //         sh.expr.convert.dictionary.map(
            //             sh.select.context_value(
            //                 p_.literal.list(["entries"])
            //             ),
            //             Value(
            //                 $.value,
            //                 {
            //                     'type': $p.type,
            //                     'temp value reference tail': p_.literal.chain(
            //                         $p['temp value reference tail'],
            //                         sh.vr.dictionary(),
            //                     ),
            //                 }
            //                 // {
            //                 //     'temp type': $p['temp type'],
            //                 //     'temp subselection': p_.literal.chain(
            //                 //         $p['temp subselection'],
            //                 //         sh.interface_.sub.dictionary(),
            //                 //     ),
            //                 //     'constrained': $p.constrained
            //                 // }
            //             ),
            //         )
            //     )
            // })
            // case 'group': return p_.option($, ($) => sh.expr.change_context(
            //     sh.select.call(
            //         sh.select.call_.external(
            //             "unmarshalled from parse tree",
            //             "Verbose Group"
            //         ),
            //         sh.select.context_value(
            //             p_.literal.list([])
            //         ),
            //         'pass through',
            //         sh.expr.initialize.group(
            //             p_.literal.dictionary({
            //                 "expected properties": sh.expr.initialize.dictionary(
            //                     p_.from.dictionary($).map(
            //                         ($) => sh.expr.initialize.nothing()
            //                     )
            //                 ),
            //             })
            //         ),
            //         p_.literal.list([]),
            //     ),
            //     sh.expr.initialize.group(p_.from.dictionary($).map(
            //         ($, id) => sh.expr.change_context(
            //             sh.select.call(
            //                 sh.select.call_.external(
            //                     "unmarshalled from parse tree",
            //                     "Property"
            //                 ),
            //                 sh.select.context_value(
            //                     p_.literal.list([])
            //                 ),
            //                 'pass through',
            //                 sh.expr.initialize.group(
            //                     p_.literal.dictionary({
            //                         "id": sh.expr.initialize.reference(id),
            //                     })
            //                 ),
            //                 p_.literal.list([]),
            //             ),
            //             Value(
            //                 $.value,
            //                 {
            //                     'type': $p.type,
            //                     'temp value reference tail': p_.literal.chain(
            //                         $p['temp value reference tail'],
            //                         sh.vr.group(id),
            //                     ),
            //                 }
            //                 // {
            //                 //     'temp type': $p['temp type'],
            //                 //     'temp subselection': p_.literal.chain(
            //                 //         $p['temp subselection'],
            //                 //         sh.interface_.sub.group(id),
            //                 //     ),
            //                 //     'constrained': $p.constrained
            //                 // }
            //             )
            //         )
            //     ))
            // ))
            // case 'list': return p_.option($, ($) => sh.expr.convert.list.map(
            //     sh.select.call(
            //         sh.select.call_.external(
            //             "unmarshalled from parse tree",
            //             "List"
            //         ),
            //         sh.select.context_value(
            //             p_.literal.list([])
            //         ),
            //         'pass through',
            //         null,
            //         p_.literal.list([
            //             "items"
            //         ]),
            //     ),
            //     sh.expr.change_context(
            //         sh.select.context_value(
            //             p_.literal.list(["value"])
            //         ),
            //         Value(
            //             $.value,
            //             {
            //                 'type': $p.type,
            //                 'temp value reference tail': p_.literal.chain(
            //                     $p['temp value reference tail'],
            //                     sh.vr.list(),
            //                 ),
            //             }
            //             // {
            //             //     'temp type': $p['temp type'],
            //             //     'temp subselection': p_.literal.chain(
            //             //         $p['temp subselection'],
            //             //         sh.interface_.sub.list(),
            //             //     ),
            //             //     'constrained': $p.constrained
            //             // }
            //         )
            //     ),
            // ))
            // case 'nothing': return p_.option($, ($) => sh.expr.select(
            //     sh.select.call(
            //         sh.select.call_.external(
            //             "unmarshalled from parse tree",
            //             "Nothing"
            //         ),
            //         sh.select.context_value(
            //             p_.literal.list([])
            //         ),
            //         'pass through',
            //         null,
            //         // sh.lookups.not_set(),
            //         // sh.arguments_.not_set(),
            //         p_.literal.list([]),
            //     )
            // ))
            // case 'optional': return p_.option($, ($) => sh.expr.convert.optional.map(
            //     sh.select.call(
            //         sh.select.call_.external(
            //             "unmarshalled from parse tree",
            //             "Optional"
            //         ),
            //         sh.select.context_value(
            //             p_.literal.list([])
            //         ),
            //         'pass through',
            //         null,
            //         p_.literal.list([
            //             "optional",
            //         ]),
            //     ),
            //     Value(
            //         $,
            //         {
            //             'type': $p.type,
            //             'temp value reference tail': p_.literal.chain(
            //                 $p['temp value reference tail'],
            //                 sh.vr.optional(),
            //             ),
            //         }
            //         // {
            //         //     'temp type': $p['temp type'],
            //         //     'temp subselection': p_.literal.chain(
            //         //         $p['temp subselection'],
            //         //         sh.interface_.sub.optional(),
            //         //     ),
            //         //     'constrained': $p.constrained
            //         // }
            //     ),
            // ))
            // case 'reference': return p_.option($, ($) => p_.from.state($.type).decide(
            //     ($) => {
            //         switch ($[0]) {
            //             case 'derived': return p_.option($, ($) => sh.expr.select(
            //                 sh.select.call(
            //                     sh.select.call_.external(
            //                         "unmarshalled from parse tree",
            //                         "Nothing"
            //                     ),
            //                     sh.select.context_value(
            //                         p_.literal.list([])
            //                     ),
            //                     'pass through',
            //                     null,
            //                     // sh.lookups.not_set(),
            //                     // sh.arguments_.not_set(),
            //                     p_.literal.list([]),
            //                 )
            //             ))
            //             case 'selected': return p_.option($, ($) => sh.expr.select(
            //                 sh.select.call(
            //                     sh.select.call_.external(
            //                         "unmarshalled from parse tree",
            //                         "Text"
            //                     ),
            //                     sh.select.context_value(
            //                         p_.literal.list([])
            //                     ),
            //                     'pass through',
            //                     null,
            //                     // sh.lookups.not_set(),
            //                     // sh.arguments_.not_set(),
            //                     p_.literal.list([]),
            //                 )
            //             ))
            //             default: return p_.exhaustive($[0])
            //         }
            //     }
            // ))
            // case 'simple': return p_.option($, ($) => p_.from.state($).decide(
            //     ($) => {
            //         switch ($[0]) {
            //             case 'global': return p_.option($, ($) => p_.from.state($['l entry'].type).decide(
            //                 ($) => {
            //                     switch ($[0]) {
            //                         case 'boolean': return p_.option($, ($) => sh.expr.select(
            //                             sh.select.call(
            //                                 sh.select.call_.external(
            //                                     "unmarshalled from parse tree",
            //                                     "Boolean"
            //                                 ),
            //                                 sh.select.context_value(
            //                                     p_.literal.list([])
            //                                 ),
            //                                 'pass through',
            //                                 sh.expr.initialize.group(
            //                                     p_.literal.dictionary({
            //                                         "type": sh.expr.initialize.state(
            //                                             "true/false",
            //                                             sh.expr.initialize.nothing()
            //                                         ),
            //                                     })
            //                                 ),
            //                                 // sh.lookups.not_set(),
            //                                 // sh.arguments_.not_set(),
            //                                 p_.literal.list([]),
            //                             )
            //                         ))
            //                         case 'date': return p_.option($, ($) => sh.expr.select(
            //                             sh.select.call(
            //                                 sh.select.call_.external(
            //                                     "unmarshalled from parse tree",
            //                                     "Number"
            //                                 ),
            //                                 sh.select.context_value(
            //                                     p_.literal.list([])
            //                                 ),
            //                                 'pass through',
            //                                 sh.expr.initialize.group(
            //                                     p_.literal.dictionary({
            //                                         "type": sh.expr.initialize.state(
            //                                             "iso date",
            //                                             sh.expr.initialize.nothing()
            //                                         ),
            //                                     })
            //                                 ),
            //                                 p_.literal.list([]),
            //                             )
            //                         ))
            //                         case 'number': return p_.option($, ($) => sh.expr.select(
            //                             sh.select.call(
            //                                 sh.select.call_.external(
            //                                     "unmarshalled from parse tree",
            //                                     "Number"
            //                                 ),
            //                                 sh.select.context_value(
            //                                     p_.literal.list([])
            //                                 ),
            //                                 'pass through',
            //                                 sh.expr.initialize.group(
            //                                     p_.literal.dictionary({
            //                                         "type": p_.from.state($.precision).decide(
            //                                             ($) => {
            //                                                 switch ($[0]) {
            //                                                     case 'approximation': return p_.option($, ($) => sh.expr.initialize.state(
            //                                                         "scientific notation",
            //                                                         sh.expr.initialize.group(
            //                                                             p_.literal.dictionary({
            //                                                                 "precision": sh.expr.initialize.natural($['significant digits']),
            //                                                             })
            //                                                         )
            //                                                     ))
            //                                                     case 'exact': return p_.option($, ($) => p_.from.optional($['number of fractional digits']).decide(
            //                                                         ($) => sh.expr.initialize.state(
            //                                                             "fractional decimal",
            //                                                             sh.expr.initialize.group(
            //                                                                 p_.literal.dictionary({
            //                                                                     "digits": sh.expr.initialize.natural($),
            //                                                                 })
            //                                                             )
            //                                                         ),
            //                                                         () => sh.expr.initialize.state(
            //                                                             "decimal",
            //                                                             sh.expr.initialize.nothing()
            //                                                         )
            //                                                     ))
            //                                                     default: return p_.exhaustive($[0])
            //                                                 }
            //                                             }
            //                                         ),
            //                                     })
            //                                 ),
            //                                 p_.literal.list([]),
            //                             )
            //                         ))
            //                         default: return p_.exhaustive($[0])
            //                     }
            //                 }))
            //             default: return p_.exhaustive($[0])
            //         }
            //     }
            // ))
            // case 'state': return p_.option($, ($) => sh.expr.change_context(
            //     sh.select.call(
            //         sh.select.call_.external(
            //             "unmarshalled from parse tree",
            //             "State"
            //         ),
            //         sh.select.context_value(
            //             p_.literal.list([])
            //         ),
            //         'pass through',
            //         null,
            //         p_.literal.list([]),
            //     ),
            //     sh.expr.convert.text.decide(
            //         sh.select.context_value(
            //             p_.literal.list(["option", "token", "value"])
            //         ),
            //         p_.literal.set(sh.schema_reference.value_reference(
            //             $p.type,
            //             $p['temp value reference tail'],
            //         )),
            //         p_.from.dictionary($.options).map(
            //             ($, id) => sh.expr.change_context(
            //                 sh.select.context_value(
            //                     p_.literal.list(["value"])
            //                 ),
            //                 sh.expr.initialize.state(
            //                     id,
            //                     Value(
            //                         $.value,
            //                         {
            //                             'type': $p.type,
            //                             'temp value reference tail': p_.literal.chain(
            //                                 $p['temp value reference tail'],
            //                                 sh.vr.state(id),
            //                             ),
            //                         }
            //                         // {
            //                         //     'temp type': $p['temp type'],
            //                         //     'temp subselection': p_.literal.chain(
            //                         //         $p['temp subselection'],
            //                         //         sh.interface_.sub.state(id),
            //                         //     ),
            //                         //     'constrained': $p.constrained
            //                         // }
            //                     )
            //                 )
            //             ),
            //         ),
            //         sh.expr.abort(
            //             sh.expr.initialize.state(
            //                 "liana", sh.expr.initialize.group(
            //                     p_.literal.dictionary({
            //                         "type": sh.expr.initialize.state(
            //                             "state", sh.expr.initialize.state(
            //                                 "unknown option",
            //                                 sh.expr.select(
            //                                     sh.select.context_value(
            //                                         p_.literal.list([
            //                                             "option",
            //                                             "token",
            //                                             "value"
            //                                         ])
            //                                     )
            //                                 )
            //                             )
            //                         ),
            //                         "range": sh.expr.select(
            //                             sh.select.context_value(
            //                                 p_.literal.list([
            //                                     "option",
            //                                     "range"
            //                                 ])
            //                             )
            //                         )
            //                     })
            //                 )
            //             )
            //         ),
            //     )
            // ))

            // case 'text': return p_.option($, ($) => sh.expr.select(
            //     sh.select.call(
            //         sh.select.call_.external(
            //             "unmarshalled from parse tree",
            //             "Text"
            //         ),
            //         sh.select.context_value(
            //             p_.literal.list([])
            //         ),
            //         'pass through',
            //         null,
            //         // sh.lookups.not_set(),
            //         // sh.arguments_.not_set(),
            //         p_.literal.list([]),
            //     )
            // ))
            default: return p_.exhaustive($[0])
        }
    }
)