import * as p_ from 'pareto-core/transformer'

import * as s_in from "../schema.js"
import * as s_out from "pareto-filesystem-unrestricted-api/modules/helpers/schemas/to_be_written_directory_content/schema"
import * as s_parameter from "pareto/modules/typescript_light/schemas/directory_content_writing/schema"

namespace declarations {

    export type Root = p_.Transformer_With_Parameter<
        s_in.Root,
        s_out.Directory,
        s_parameter.Parameters
    >
    
}

//dependencies
import * as t_to_pareto_module from "./pareto_module.js"
import * as t_pareto_to_typescript_directory_content from "pareto/modules/pareto_new/schemas/module/transformers/typescript_directory_content"


export const Root: declarations.Root = ($, $p) => t_pareto_to_typescript_directory_content.Module(
    t_to_pareto_module.Root($),
    $p
)