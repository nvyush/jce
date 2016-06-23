<?php
/**
 * @package    JCE
 * @copyright    Copyright (c) 2009-2015 Ryan Demmer. All rights reserved.
 * @license    GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
defined('_JEXEC') or die('RESTRICTED');

?>

<div class="ui-grid ui-grid-small">
    <div class="ui-width-4-5">

        <div class="ui-form-row">
            <label for="src" class="hastip ui-form-label ui-width-1-5" title="<?php echo WFText::_('WF_LABEL_URL_DESC'); ?>">
                <?php echo WFText::_('WF_LABEL_URL'); ?>
            </label>
            <div class="ui-form-controls ui-width-4-5">
                <input type="text" id="src" value="" required />
            </div>
        </div>

        <div class="ui-form-row">
            <label for="alt" class="hastip ui-form-label ui-width-1-5" title="<?php echo WFText::_('WF_LABEL_ALT_DESC'); ?>">
                <?php echo WFText::_('WF_LABEL_ALT'); ?>
            </label>
            <div class="ui-form-controls ui-width-4-5">
                <input type="text" id="alt" value="" />
            </div>
        </div>

        <div class="ui-form-row" id="attributes-dimensions">
            <label class="hastip ui-form-label ui-width-1-5" title="<?php echo WFText::_('WF_LABEL_DIMENSIONS_DESC'); ?>">
                <?php echo WFText::_('WF_LABEL_DIMENSIONS'); ?>
            </label>
            <div class="ui-form-controls ui-width-4-5">
                <input type="text" id="width" value="" />
                <strong class="ui-margin-left ui-margin-right ui-vertical-align-middle">&times;</strong>
                <input type="text" id="height" />

                <input class="ui-constrain-checkbox" type="checkbox" checked />
            </div>
        </div>

        <div class="ui-form-row" id="attributes-align">
            <label for="align" class="hastip ui-form-label ui-width-1-5"
                   title="<?php echo JText::_('WF_LABEL_ALIGN_DESC'); ?>">
                <?php echo JText::_('WF_LABEL_ALIGN'); ?>
            </label>

            <div class="ui-width-2-5">
                <div class="ui-form-controls ui-width-9-10">
                    <select id="align">
                        <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                        <optgroup label="------------">
                            <option value="left"><?php echo WFText::_('WF_OPTION_ALIGN_LEFT'); ?></option>
                            <option value="center"><?php echo WFText::_('WF_OPTION_ALIGN_CENTER'); ?></option>
                            <option value="right"><?php echo WFText::_('WF_OPTION_ALIGN_RIGHT'); ?></option>
                        </optgroup>
                        <optgroup label="------------">
                            <option value="top"><?php echo WFText::_('WF_OPTION_ALIGN_TOP'); ?></option>
                            <option value="middle"><?php echo WFText::_('WF_OPTION_ALIGN_MIDDLE'); ?></option>
                            <option value="bottom"><?php echo WFText::_('WF_OPTION_ALIGN_BOTTOM'); ?></option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="ui-width-2-5">
                <label for="clear" class="hastip ui-form-label ui-width-3-10"
                       title="<?php echo JText::_('WF_LABEL_CLEAR_DESC'); ?>">
                    <?php echo JText::_('WF_LABEL_CLEAR'); ?>
                </label>
                <div class="ui-form-controls ui-width-7-10">
                    <select id="clear" disabled>
                        <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                        <option value="none"><?php echo WFText::_('WF_OPTION_CLEAR_NONE'); ?></option>
                        <option value="both"><?php echo WFText::_('WF_OPTION_CLEAR_BOTH'); ?></option>
                        <option value="left"><?php echo WFText::_('WF_OPTION_CLEAR_LEFT'); ?></option>
                        <option value="right"><?php echo WFText::_('WF_OPTION_CLEAR_RIGHT'); ?></option>
                    </select>
                </div>
            </div>
        </div>

        <div class="ui-form-row ui-hidden-mini" id="attributes-margin">
            <label for="margin" class="hastip ui-form-label ui-width-1-5" title="<?php echo WFText::_('WF_LABEL_MARGIN_DESC'); ?>">
                <?php echo WFText::_('WF_LABEL_MARGIN'); ?>
            </label>
            <div class="ui-form-controls ui-width-4-5">

                <div class="ui-width-2-10">
                    <label for="margin_top" class="ui-form-label ui-width-1-2">
                        <?php echo WFText::_('WF_OPTION_TOP'); ?>
                    </label>
                    <div class="ui-form-controls ui-width-1-2">
                        <input type="text" id="margin_top" value="" />
                    </div>
                </div>

                <div class="ui-width-2-10 ui-margin-small-left">
                    <label for="margin_right" class="ui-form-label ui-width-1-2">
                        <?php echo WFText::_('WF_OPTION_RIGHT'); ?>
                    </label>
                    <div class="ui-form-controls ui-width-1-2">
                        <input type="text" id="margin_right" value="" />
                    </div>
                </div>

                <div class="ui-width-2-10 ui-margin-small-left">
                    <label for="margin_bottom" class="ui-form-label ui-width-1-2">
                        <?php echo WFText::_('WF_OPTION_BOTTOM'); ?>
                    </label>
                    <div class="ui-form-controls ui-width-1-2">
                        <input type="text" id="margin_bottom" value="" />
                    </div>
                </div>

                <div class="ui-width-2-10 ui-margin-small-left">
                    <label for="margin_left" class="ui-form-label ui-width-1-2">
                        <?php echo WFText::_('WF_OPTION_LEFT'); ?>
                    </label>
                    <div class="ui-form-controls ui-width-1-2">
                        <input type="text" id="margin_left" value="" />
                    </div>
                </div>
                <div class="ui-width-1-10 ui-text-left">
                    <input type="checkbox" id="margin_check" />
                </div>
            </div>
        </div>

        <div class="ui-form-row ui-hidden-mini" id="attributes-border">
            <label for="border" class="hastip ui-form-label ui-width-1-5" title="<?php echo WFText::_('WF_LABEL_BORDER_DESC'); ?>">
                <?php echo WFText::_('WF_LABEL_BORDER'); ?>
            </label>

            <div class="ui-form-controls ui-width-4-5">
                <div class="ui-form-controls ui-width-0-3 ui-margin-small-right ui-margin-small-top">
                    <input type="checkbox" id="border" />
                </div>

                <div class="ui-width-3-10">
                    <label for="border_width" class="hastip ui-form-label ui-width-4-10"
                           title="<?php echo WFText::_('WF_LABEL_BORDER_WIDTH_DESC'); ?>"><?php echo WFText::_('WF_LABEL_WIDTH'); ?></label>
                    <div class="ui-form-controls ui-width-6-10 ui-datalist">
                        <select pattern="[0-9]+" id="border_width">
                            <option value="inherit"><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="thin"><?php echo WFText::_('WF_OPTION_BORDER_THIN'); ?></option>
                            <option value="medium"><?php echo WFText::_('WF_OPTION_BORDER_MEDIUM'); ?></option>
                            <option value="thick"><?php echo WFText::_('WF_OPTION_BORDER_THICK'); ?></option>
                        </select>
                    </div>
                </div>

                <div class="ui-width-3-10 ui-margin-small-left">
                    <label for="border_style" class="hastip ui-form-label ui-width-4-10"
                           title="<?php echo WFText::_('WF_LABEL_BORDER_STYLE_DESC'); ?>"><?php echo WFText::_('WF_LABEL_STYLE'); ?></label>
                    <div class="ui-form-controls ui-width-6-10">
                        <select id="border_style">
                            <option value="inherit"><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                            <option value="none"><?php echo WFText::_('WF_OPTION_BORDER_NONE'); ?></option>
                            <option value="solid"><?php echo WFText::_('WF_OPTION_BORDER_SOLID'); ?></option>
                            <option value="dashed"><?php echo WFText::_('WF_OPTION_BORDER_DASHED'); ?></option>
                            <option value="dotted"><?php echo WFText::_('WF_OPTION_BORDER_DOTTED'); ?></option>
                            <option value="double"><?php echo WFText::_('WF_OPTION_BORDER_DOUBLE'); ?></option>
                            <option value="groove"><?php echo WFText::_('WF_OPTION_BORDER_GROOVE'); ?></option>
                            <option value="inset"><?php echo WFText::_('WF_OPTION_BORDER_INSET'); ?></option>
                            <option value="outset"><?php echo WFText::_('WF_OPTION_BORDER_OUTSET'); ?></option>
                            <option value="ridge"><?php echo WFText::_('WF_OPTION_BORDER_RIDGE'); ?></option>
                        </select>
                    </div>
                </div>

                <div class="ui-width-3-10 ui-margin-small-left">
                    <label for="border_color" class="hastip ui-form-label ui-width-3-10"
                           title="<?php echo WFText::_('WF_LABEL_BORDER_COLOR_DESC'); ?>"><?php echo WFText::_('WF_LABEL_COLOR'); ?></label>
                    <div class="ui-form-controls ui-width-7-10">
                        <input id="border_color" class="color" type="text" value="#000000" onchange="TinyMCE_Utils.updateColor(this);" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui-width-1-5">
        <div class="preview">
            <img id="sample" src="<?php echo $this->plugin->image('sample.jpg', 'libraries'); ?>" alt="sample.jpg"/>
            <?php echo WFText::_('WF_LOREM_IPSUM'); ?>
        </div>
    </div>
</div>
