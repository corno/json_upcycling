import * as p_ from 'pareto-core/transformer'
import * as p_s from 'pareto-core/serializer'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'
import p_variables from 'pareto-core/refiner/specials/variables'

//schemas
import type * as s_in from "../schema.js"
import type * as s_out from "pareto/modules/pareto_new/schemas/schema/schema" //FIXME; this should be unresolved

namespace s_parameters {
}

namespace declarations {

    export type Properties = p_.Transformer<
        s_in.Properties,
        s_out.Value.group.properties
    >

    export type Root = p_.Transformer<
        s_in.Root,
        s_out.Schema
    >

    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Value
    >

    // export type Verbose_Group = p_.Transformer<
    //     s_in.Verbose_Type,
    //     s_out.Value
    // >

    // export type Type_Reference = p_.Transformer<
    //     s_in.Module_Reference,
    //     s_out.Value.reference
    // >

    // export type Simple_Type = p_.Transformer<
    //     s_in.Simple_Type,
    //     s_out.Value
    // >

    // export type Value = p_.Transformer_With_Parameter<
    //     s_in.Value,
    //     s_out.Value,
    //     s_parameters.Parameters
    // >

    // export type Value_Results = p_.Transformer_With_Parameter<
    //     s_in.Value_Results,
    //     s_out.Value,
    //     {
    //         'base type': s_out.Value
    //     }
    // >

    // export type Value_Path = p_.Transformer<
    //     s_in.Value_Path,
    //     s_out.Value.reference.subselection
    // >

}

//shorthands
import * as sh from "pareto/modules/pareto_new/schemas/schema/shorthands/target"

export const Properties: declarations.Properties = ($) => p_.from.dictionary(
    $
).map(
    ($) => {
        const $v_value = $.value
        return p_.from.boolean($.optional).decide(
            () => sh.v.optional(
                Value($v_value)
            ),
            () => Value($v_value)
        )
    }
)

export const Root: declarations.Root = ($) => sh.schema(
    p_.literal.dictionary({}),
    p_.from.dictionary($.types).map(
        ($) => ({
            'root': Value($)
        })
    )
)

export const Value: declarations.Value = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'array': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'list': return p_.option($, ($) => sh.v.list(
                            Value($)
                        ))
                        case 'group': return p_.option($, ($) => sh.v.group(
                            p_.from.dictionary($.properties).map(
                                ($) => Value($.value)
                            )
                        ))
                        case 'cycle up': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'unique strings': return p_.option($, ($) => sh.v.dictionary(sh.v.nothing()))
                                    case 'indexed objects': return p_.option($, ($) => sh.v.dictionary(
                                        sh.v.group(
                                            Properties($.properties)
                                        )
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            case 'boolean': return p_.option($, ($) => sh.v.boolean())
            case 'component': return p_.option($, ($) => sh.v.component_sibling($))
            case 'null': return p_.option($, ($) => sh.v.nothing())
            case 'nullable': return p_.option($, ($) => sh.v.optional(
                Value($)
            ))
            case 'number': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'integer': return p_.option($, ($) => sh.v.integer())
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            case 'string': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'text': return p_.option($, ($) => sh.v.text())
                        case 'cycle up': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'enumeration': return p_.option($, ($) => sh.v.state(
                                        p_.from.dictionary($).map(
                                            ($) => sh.v.nothing()
                                        )
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            case 'object': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'group': return p_.option($, ($) => sh.v.group(
                            Properties($.properties)
                        ))
                        case 'cycle up': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'discriminated': return p_.option($, ($) => sh.v.state(
                                        p_.from.dictionary($.options).map(
                                            ($) => Value($)
                                        )
                                    ))
                                    case 'discriminated with fallback': return p_.option($, ($) => sh.v.state(
                                        p_.literal.dictionary({
                                            "option": sh.v.state(
                                                p_.from.dictionary($.options).map(
                                                    ($) => Value($)
                                                )
                                            ),
                                            "fallback": Value($.fallback)
                                        })
                                    ))
                                    case 'group and dictionary mixed':return p_.option($, ($) => sh.v.group(
                                        p_.literal.dictionary({
                                            "fixed": sh.v.group(
                                                Properties($.properties)
                                            ),
                                            "variable": sh.v.dictionary(
                                                Value($['additional properties'])
                                            )
                                        })
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'dictionary': return p_.option($, ($) => sh.v.dictionary(
                            Value($)
                        ))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            default: return p_.exhaustive($[0])
        }
    }
)
